package cn.gzmdrw.chat.mapper;

import cn.gzmdrw.chat.pojo.SendMessage;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChatMessageMapper {

    int saveMessage(SendMessage sendMessage);

    List<SendMessage> chatRecord(String toUser, String receiver);

    List<SendMessage> allRecord(String receiver);
}
