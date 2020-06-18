package cn.gzmdrw.chat.mapper;

import cn.gzmdrw.chat.pojo.SysFriend;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SysFriendMapper {
    List<SysFriend> getFriendById(String userId);

    int addFriend(SysFriend sysFriend);

    SysFriend getFriendByUserId(String friendId, String userId);
}
