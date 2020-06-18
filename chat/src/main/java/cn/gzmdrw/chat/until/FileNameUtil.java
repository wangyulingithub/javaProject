package cn.gzmdrw.chat.until;

public class FileNameUtil {

    /**
     * 获取图片的后缀
     *
     * @param fileName
     * @return
     */
    public static String getSuffix(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    /**
     * 生成新的图片名称
     *
     * @param fileOriginName
     * @return
     */
    public static String getFileName(String fileOriginName) {
        return UUIDUtil.getUUID() + getSuffix(fileOriginName);
    }
}
