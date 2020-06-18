package cn.gzmdrw.chat.controller;

import cn.gzmdrw.chat.pojo.SendMessage;
import cn.gzmdrw.chat.pojo.SysUser;
import cn.gzmdrw.chat.service.UserService;
import cn.gzmdrw.chat.service.WebStompService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class StompController {
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    WebStompService webStompService;

    @Autowired
    UserService userService;

    @RequestMapping("tooRoom")
    public String tooRoom(String chooseName, Integer mark, Model model, HttpSession session) {
        SysUser sysUser = (SysUser) session.getAttribute("user");
        session.setAttribute("roomName", chooseName);
        model.addAttribute("chooseName", chooseName);
        model.addAttribute("mark", mark);
        model.addAttribute("sysUser", sysUser);
        return "messages/chatRoom";
    }

    /**
     *单聊
     * @param sendMessage SendMessage
     */
    @MessageMapping("/singleChat")
    public void singleUser(SendMessage sendMessage) {
        //通过SimpMessagingTemplate的convertAndSendToUser向用户发送消息。
        //第一参数表示接收信息的用户，第二个是浏览器订阅的地址，第三个是消息本身
        simpMessagingTemplate.convertAndSendToUser(sendMessage.getReceiver(), "/queue/dynamic", sendMessage);
        //保存用户聊天信息
        int result = webStompService.saveMessage(sendMessage);

    }

    /**
     * 群聊
     * @param sendMessage
     * @return
     */
    @MessageMapping("/allChat")
    @SendTo("/all/getResponse") //此注解的方法与convertAndSend（）功能相同
    public SendMessage allUser(SendMessage sendMessage) {
        //保存用户聊天信息
        int result = webStompService.saveMessage(sendMessage);
        return sendMessage;
    }


    //上线
    @MessageMapping("/online")
    @SendTo("/on/online")
    public SendMessage online(SendMessage sendMessage) {
        /*simpMessagingTemplate.convertAndSend("/on/online", sendMessage);*/
        return sendMessage;
    }

    //下线
    @MessageMapping("/offline")
    public void offline(SendMessage sendMessage) {
        simpMessagingTemplate.convertAndSend("/topic/offline", sendMessage);
    }

    /*//添加online用户
    @RequestMapping("/addSessionName")
    @ResponseBody
    public List<SysUser> getSessionUser(HttpSession session){
        return onlineUsers;
    }*/

    //查询聊天消息
    @PostMapping("queryRecords")
    @ResponseBody
    public List<SendMessage> queryRecords(String toUser, String receiver){
        List<SendMessage> sendMessages = webStompService.chatRecord(toUser,receiver);
        return sendMessages;
    }

    //查询聊天消息
    @PostMapping("allRecords")
    @ResponseBody
    public List<SendMessage> allRecords(String receiver){
        List<SendMessage> sendMessages = webStompService.allRecord(receiver);
        return sendMessages;
    }
}
