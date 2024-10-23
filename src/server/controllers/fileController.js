import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import multer from "multer";
import { unlink } from "node:fs/promises";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const prisma = new PrismaClient();

// dest starts from root directory
const upload = multer({ dest: "./src/server/public/uploads" });

cloudinary.config({
  // Put in Railway
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

dotenv.config();

const post_upload_file = [
  upload.single("file"),
  expressAsyncHandler(async (req, res, next) => {
    const imageURL = await cloudinary.uploader.upload(req.file.path, {
      folder: "file_uploader"
    });
    await unlink(req.file.path);
    const folder = await prisma.folder.findFirst({
      where: {
        name: req.body.folder,
        userId: req.params.id
      }
    });
    if (!folder) {
      const newFolder = await prisma.folder.create({
        data: {
          name: req.body.folder,
          userId: req.params.id
        }
      });
      const newFile = await prisma.file.create({
        data: {
          name: req.body.name,
          url: imageURL.secure_url,
          Folder: {
            connect: {
              id: newFolder.id
            }
          },
          User: {
            connect: {
              id: req.params.id
            }
          },
          size: imageURL.bytes,
          format: imageURL.format,
          publicId: imageURL.public_id.slice(14)
        }
      });
    } else {
      const newFile = await prisma.file.create({
        data: {
          name: req.body.name,
          url: imageURL.secure_url,
          Folder: {
            connect: {
              id: folder.id
            }
          },
          User: {
            connect: {
              id: req.params.id
            }
          },
          size: imageURL.bytes,
          format: imageURL.format,
          publicId: imageURL.public_id.slice(14)
        }
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(user);
  })
];

export const get_folder_files = expressAsyncHandler(async (req, res, next) => {
  const files = await prisma.file.findMany({
    where: {
      folderId: req.params.folderId
    }
  });
  res.status(200).json(files);
});

export const get_file = expressAsyncHandler(async (req, res, next) => {
  const file = await prisma.file.findFirst({
    where: {
      id: req.params.fileId
    }
  });
  res.status(200).json(file);
});

export const delete_file = expressAsyncHandler(async (req, res, next) => {
  const file = await prisma.file.delete({
    where: {
      id: req.params.fileId
    }
  });
  await cloudinary.uploader.destroy(`file_uploader/${file.publicId}`);
  const files = await prisma.file.findMany({
    where: {
      folderId: req.params.folderId
    }
  });
  res.status(200).json(files);
});

export const get_file_share = expressAsyncHandler(async (req, res, next) => {
  const file = await prisma.file.findFirst({
    where: {
      id: req.params.fileId
    },
    include: {
      Folder: true
    }
  });
  if (file) {
    const date = new Date(file.Folder.share_Date);
    if (Date.now() < date.getTime()) {
      res.status(200).json(file);
    } else {
      res.status(200).json(null);
    }
  } else {
    res.status(200).json(null);
  }
});

export default post_upload_file;
