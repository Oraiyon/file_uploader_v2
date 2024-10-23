const DisplayFileSize = (props) => {
  // Using base 10 conversion
  if (props.file.size / 1000000 < 1024) {
    return <p>{(props.file.size / 1000000).toFixed(2)} MB</p>;
  } else {
    return <p>{(props.file.size / 1000000000).toFixed(2)} GB</p>;
  }
};
export default DisplayFileSize;
