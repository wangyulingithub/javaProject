package cn.gzmdrw.chat.service;

import cn.gzmdrw.chat.mapper.PersonalDataMapper;
import cn.gzmdrw.chat.pojo.SysUser;
import cn.gzmdrw.chat.until.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class PersonalDataService {

    @Autowired
    PersonalDataMapper dataMapper;
    //更换头像
    public String updatePicture(MultipartFile file, SysUser sysUser) {
        //获取原文件名
        String fileName = file.getOriginalFilename();
        String pictureUrl=null;
        boolean re = FileUtil.upload(fileName,file);
        if (re) {
            pictureUrl = "img/"+fileName;
            int result = dataMapper.updatePicture(pictureUrl,sysUser.getUserId());
            return "更新成功";
        }else {
            return "更新失败";
        }
    }

    /**
     * 更改名称
     * @param username
     * @param userId
     * @return
     */
    public int updateUserName(String username, String userId) {
        int result = dataMapper.updateUserName(username,userId);
        return result;
    }

    /**
     * 更改个性签名
     * @param signature
     * @param userId
     * @return
     */
    public int updateSignature(String signature, String userId) {
        int result = dataMapper.updateSignature(signature,userId);
        return result;
    }
}
