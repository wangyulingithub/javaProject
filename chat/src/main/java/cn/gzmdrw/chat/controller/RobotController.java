package cn.gzmdrw.chat.controller;

import cn.gzmdrw.chat.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RobotController {
    @Autowired
    RobotService robotService;

    /**
     * 用户发送消息给机器人，并且返回应答
     * @return 机器人的回复
     */
    @PostMapping("/sendToRobot")
    @ResponseBody
    public String sendUserMessage(Model model, @RequestParam("sendContent") String sendContent) {
        String reply = robotService.sendMessage(sendContent);
        return reply;
    }
}
