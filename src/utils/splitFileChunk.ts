/**
 * 生成切片
 * @param {File} file
 * @param {number} size
 */
const splitFileChunk = (file:File, size:number) => {
  const fileChunkList:Blob[] = [];
  let current = 0;
  while (current < file.size) {
    fileChunkList.push(file.slice(current, current + size));
    current += size;
  }
  return fileChunkList;
};

export default splitFileChunk;
