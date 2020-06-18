package cn.gzmdrw.chat.mapper;

import cn.gzmdrw.chat.pojo.SysUser;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    /*@Select("SELECT id,username,password FROM user WHERE username=#{username}")*/
    SysUser getUserByName(String username);

    int addUser(SysUser sysUser);

    SysUser getUserByUserId(String userId);
}
