package cn.gzmdrw.chat.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestParam;

@Mapper
public interface PersonalDataMapper {
    int updatePicture(@RequestParam("localPath") String pictureUrl,String userId);

    int updateUserName(@RequestParam("username") String username, @RequestParam("userId") String userId);

    int updateSignature(String signature, String userId);
}
