package cn.gzmdrw.chat.controller;

import cn.gzmdrw.chat.pojo.SysFriend;
import cn.gzmdrw.chat.pojo.SysUser;
import cn.gzmdrw.chat.service.SysFriendService;
import cn.gzmdrw.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;


@Controller
public class FriendController {

    @Autowired
    SysFriendService friendService;

    @Autowired
    UserService userService;

    /**
     * 添加好友
     * @param sysFriend
     * @return
     */
    @RequestMapping("addFriend")
    @ResponseBody
    public int addFriend(SysFriend sysFriend){

        return friendService.addFriend(sysFriend);
    }
    //搜索好友
    @RequestMapping("/searchFriend")
    public String searchFriend(HttpSession session, Model model){
        SysUser sysUser = (SysUser) session.getAttribute("user");
        model.addAttribute("sysUser",sysUser);
        return "messages/searchFriend";
    }
    //到搜索页面
    @PostMapping("/toSearchFriend")
    @ResponseBody
    public SysUser toSearchFriend(String username){
        SysUser SysUser = userService.getUserName(username);
        return SysUser;
    }
}
