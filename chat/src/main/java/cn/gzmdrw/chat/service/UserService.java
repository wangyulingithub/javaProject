package cn.gzmdrw.chat.service;

import cn.gzmdrw.chat.config.RandomTest;
import cn.gzmdrw.chat.mapper.UserMapper;
import cn.gzmdrw.chat.pojo.SysFriend;
import cn.gzmdrw.chat.pojo.SysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private static final String DEFAULT_AVATAR="defaultImg/tou01.jpg";

    @Autowired
    UserMapper userMapper;

    @Autowired
    SysFriendService friendService;

    public SysUser getUserName(String username) {
        SysUser sysUser = userMapper.getUserByName(username);
        return sysUser;
    }

    public SysUser getUserByName(String username) {
        SysUser sysUser = userMapper.getUserByName(username);
        List<SysFriend> sysFriend = friendService.getFriendById(sysUser.getUserId());
        sysUser.setSysFriends(sysFriend);
        return sysUser;
    }

    public SysUser getUserByUserId(String userId) {
        SysUser result = userMapper.getUserByUserId(userId);
        return result;
    }

    /**
     * 用户注册
     * @param user
     * @return  返回整型结果
     */
    public int addUser(SysUser user) {
        String userId = null;
        SysUser sysUser = new SysUser();
        String newPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        do {
            userId = RandomTest.getCharAndNumOne(6);
        } while (getUserByUserId(userId) != null);  //判断是随机产生的账号是否相同如果相同则重新生成！
        sysUser.setUserId(userId);
        sysUser.setPassword(newPassword);
        sysUser.setUsername(user.getUsername());
        sysUser.setHeadShot(DEFAULT_AVATAR);
        sysUser.setSex(user.getSex());
        int result = userMapper.addUser(sysUser);     //注册用户
        return result;
    }

}
