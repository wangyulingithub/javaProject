package cn.gzmdrw.chat.service;

import cn.gzmdrw.chat.mapper.SysFriendMapper;
import cn.gzmdrw.chat.mapper.UserMapper;
import cn.gzmdrw.chat.pojo.SysFriend;
import cn.gzmdrw.chat.pojo.SysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SysFriendService{
    @Autowired
    SysFriendMapper friendMapper;

    @Autowired
    UserMapper userMapper;

    /**
     * 根据用户Id查询好友
     * @param userId   用户Id
     * @return  返回好友结果集
     */
    public List<SysFriend> getFriendById(String userId){
        List<SysFriend> friends = new ArrayList<>();
        List<SysFriend> sysFriends = friendMapper.getFriendById(userId);
        for (SysFriend sysFriend : sysFriends) {
           SysUser sysUser = userMapper.getUserByUserId(sysFriend.getFriendId());
            sysFriend.setSysUser(sysUser);
            friends.add(sysFriend);
        }

        return friends;
    }

    /**
     * 添加好友
     * @param sysFriend 好友实体对象
     * @return  返回整型结果
     */
    public int addFriend(SysFriend sysFriend){

        return friendMapper.addFriend(sysFriend);
    }

    /**
     * 查询好友
     * @param friendId  好友Id
     * @param userId    用户Id
     * @return  返回好友对象
     */
    public SysFriend getFriendByUserId(String friendId, String userId) {

        return friendMapper.getFriendByUserId(friendId,userId);
    }
}
