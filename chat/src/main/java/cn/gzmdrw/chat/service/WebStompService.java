package cn.gzmdrw.chat.service;

import cn.gzmdrw.chat.mapper.ChatMessageMapper;
import cn.gzmdrw.chat.pojo.SendMessage;
import cn.gzmdrw.chat.pojo.SysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebStompService {
    @Autowired
    ChatMessageMapper chatMessageMapper;

    @Autowired
    UserService userService;

    public int saveMessage(SendMessage sendMessage) {

        return chatMessageMapper.saveMessage(sendMessage);
    }

    //查看单聊的消息
    public List<SendMessage> chatRecord(String toUser, String receiver) {
        SysUser sysUser = null;
        List<SendMessage> sendMessages = chatMessageMapper.chatRecord(toUser, receiver);;
        for (SendMessage sendMessage : sendMessages) {
            sysUser = userService.getUserName(sendMessage.getToUser());
            sendMessage.setSysUser(sysUser);
        }
        return sendMessages;
    }

    //查看群聊的消息F
    public List<SendMessage> allRecord(String receiver) {
        SysUser sysUser = null;
        List<SendMessage> sendMessages = chatMessageMapper.allRecord(receiver);
        for (SendMessage sendMessage : sendMessages) {
            sysUser = userService.getUserName(sendMessage.getToUser());
            sendMessage.setSysUser(sysUser);
        }
        return sendMessages;
    }
}
