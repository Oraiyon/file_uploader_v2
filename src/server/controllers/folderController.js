import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const prisma = new PrismaClient();

cloudinary.config({
  // Put in Railway
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

dotenv.config();

const get_folders = expressAsyncHandler(async (req, res, next) => {
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.params.id
    },
    include: {
      User: true
    }
  });
  res.status(200).json(folders);
});

export const delete_folder = expressAsyncHandler(async (req, res, next) => {
  const files = await prisma.file.findMany({
    where: {
      folderId: req.params.folderId
    }
  });
  if (files.length) {
    res.status(200).json({ filesLength: files.length });
  } else {
    const deletedFolder = await prisma.folder.delete({
      where: {
        id: req.params.folderId
      }
    });
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.params.id
      },
      include: {
        User: true
      }
    });
    res.status(200).json(folders);
  }
});

export const delete_folder_files = expressAsyncHandler(async (req, res, next) => {
  const files = await prisma.file.findMany({
    where: {
      folderId: req.params.folderId
    }
  });
  for (let i = 0; i < files.length; i++) {
    await cloudinary.uploader.destroy(`file_uploader/${files[i].publicId}`);
  }
  const deletedFiles = await prisma.file.deleteMany({
    where: {
      folderId: req.params.folderId
    }
  });
  const deletedFolder = await prisma.folder.delete({
    where: {
      id: req.params.folderId
    }
  });
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.params.id
    },
    include: {
      User: true
    }
  });
  res.status(200).json(folders);
});

export const put_share_folder = expressAsyncHandler(async (req, res, next) => {
  const folder = await prisma.folder.update({
    where: {
      id: req.params.folderId,
      userId: req.params.id
    },
    data: {
      share_Date: new Date(Date.now() + 60 * 60 * 24 * 1000 * req.body.length)
    }
  });
  res.status(200).json(folder);
});

export const get_shared_folder = expressAsyncHandler(async (req, res, next) => {
  const folder = await prisma.folder.findFirst({
    where: {
      id: req.params.folderId
    },
    include: {
      User: true
    }
  });
  const date = new Date(folder.share_Date);
  if (Date.now() < date.getTime() || !folder) {
    const files = await prisma.file.findMany({
      where: {
        folderId: folder.id
      }
    });
    res.status(200).json({ folder: folder, files: files });
  } else {
    res.status(200).json(null);
  }
});

export default get_folders;
