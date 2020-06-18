package cn.gzmdrw.chat.until;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class FileUtil {

    public final static String IMG_PATH_PREFIX = "/src/main/resources/static/img/";
    public final static String ORIGINAL_URL = "/src/main/resources/static/";

    /**
     * 上传文件
     *
     * @param file 文件
     * @return
     */
    public static boolean upload(String fileName, MultipartFile file) {
        //获取项目的根路径
        String localPath = System.getProperty("user.dir");
        // 生成新的文件名
        //String newFile = localPath + IMG_PATH_PREFIX+FileNameUtil.getFileName(fileName);
        //以原名保存
        String newFile = localPath+IMG_PATH_PREFIX+ fileName;
       /* //原来的头像地址
        String originalPictureUrl = localPath+ORIGINAL_URL+originalPicture;
        File original = new File(originalPictureUrl);
        //判断文件父目录是否存在
        if (original.exists()){
            //删除原来的头像
            original.delete();

        }*/
        File dest = new File(newFile);
        //判断文件父目录是否存在
        if (!dest.exists()) {
            if(dest.mkdir()){
                System.out.println("创建成功");
                try {
                    file.transferTo(dest);
                    return true;
                } catch (IOException e) {
                    e.printStackTrace();
                    return false;
                }
            } else {
                System.out.println("创建失败");
                return false;
            }

        } else {
            System.out.println("已存在无需创建");
            return true;
        }
    }
}
