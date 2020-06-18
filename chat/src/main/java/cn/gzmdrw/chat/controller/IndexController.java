package cn.gzmdrw.chat.controller;

import cn.gzmdrw.chat.pojo.SysFriend;
import cn.gzmdrw.chat.pojo.SysUser;
import cn.gzmdrw.chat.service.SysFriendService;
import cn.gzmdrw.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/")
public class IndexController {
    @Autowired
    UserService userService;

    @Autowired
    SysFriendService sysFriendService;

    @RequestMapping("login")
    public String login() {
        return "login";
    }

    /*
     * 登录成功后调用的方法
     *
     * @param model
     * @return
     */
    @RequestMapping("index")
    public String index(Model model, HttpSession session, Authentication auth) {
        /*String clientIp = request.getRemoteAddr();*/
        /*model.addAttribute("clientIp", clientIp);*/
        String username = auth.getName();
        SysUser user = userService.getUserByName(username);
        session.setAttribute("user",user);
        model.addAttribute("sysUser", user);
        return "index";
    }

    @RequestMapping("toRegister")
    public String toRegister() {
        return "register";
    }


    @RequestMapping("add")
    public String addUser(SysUser user) {
        int result = userService.addUser(user);
        if (result>0){
            return "login";
        }
        return "redirect:/";

    }

    /*@RequestMapping("add")
    @ResponseBody
    public int addUser(SysUser user) {
        int result = userService.addUser(user);
        return result;
    }*/

    @PostMapping("addQueryName")
    @ResponseBody
    public boolean addQueryName(String username) {
        SysUser sysUser = userService.getUserName(username);
        if (sysUser!=null){
            return true;
        }
        return false;
    }

    /*
     * @return
     */
    @RequestMapping("personal")
    public String personal(String friendId,String userId,Model model) {
        //把当前登录的用户也传都个人信息中
        SysUser sysFriendUser = userService.getUserByUserId(friendId);  //查询好友的资料
        SysFriend sysFriend = sysFriendService.getFriendByUserId(friendId,userId);  //查询是否为该用户的好友
        model.addAttribute("sysFriendUser",sysFriendUser);
        model.addAttribute("sysFriend",sysFriend);
        model.addAttribute("userId",userId);
        return "messages/personalPage";
    }

    /*
     * @param userName
     * @param model
     * @return
     */
    @GetMapping("/message")
    public String message(String userName, Model model) {
        model.addAttribute("userName", userName);
        return "messages/interface";
    }

    /*
     *
     * @param roomName
     * @param session
     * @return
     */


    @PostMapping("toRoom")
    @ResponseBody
    public String toRoom(String roomName, HttpSession session) {
        session.setAttribute("roomName", roomName);
        return roomName;
    }

    /*
     *
     * @param session
     * @return
     */
    @PostMapping("getSessionRoom")
    @ResponseBody
    public String getSessionRoom(HttpSession session) {
        String roomName = (String) session.getAttribute("chooseName");
        return roomName;
    }


}
