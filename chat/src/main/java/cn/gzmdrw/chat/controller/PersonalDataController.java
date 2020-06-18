package cn.gzmdrw.chat.controller;

import cn.gzmdrw.chat.pojo.SysUser;
import cn.gzmdrw.chat.service.PersonalDataService;
import cn.gzmdrw.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller
public class PersonalDataController {

    @Autowired
    PersonalDataService dataService;

    @Autowired
    UserService userService;

    /**
     * 更换头像
     * @param file
     * @param request
     * @param session
     * @return
     * @throws IOException
     */
    @PostMapping("/upload")
    @ResponseBody
    public String updatePicture(@RequestParam(value = "file", required = false) MultipartFile file, HttpServletRequest request, HttpSession session) throws IOException {
        SysUser sysUser = (SysUser) session.getAttribute("user");
        String newFile = null;
        if (file.isEmpty()) {
            return "请重新选择";
        } else {
            newFile = dataService.updatePicture(file,sysUser);
            return newFile;
        }
    }

    /**
     * 更改名称
     * @param username
     * @param userId
     * @return
     */
    @PostMapping("/updateName")
    @ResponseBody
    public int updateUserName(@RequestParam("username") String username,@RequestParam("userId") String userId,HttpServletRequest request){
      int result = dataService.updateUserName(username,userId);
        if (result>0){
            SysUser user = userService.getUserByName(username);
            //1.从HttpServletRequest中获取SecurityContextImpl对象
            SecurityContextImpl securityContextImpl = (SecurityContextImpl) request.getSession().getAttribute("SPRING_SECURITY_CONTEXT");
            //2.从SecurityContextImpl中获取Authentication对象
            Authentication authentication = securityContextImpl.getAuthentication();
            //3.初始化UsernamePasswordAuthenticationToken实例 ，这里的参数user就是我们要更新的用户信息
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, authentication.getCredentials());
            auth.setDetails(authentication.getDetails());
            //4.重新设置SecurityContextImpl对象的Authentication
            securityContextImpl.setAuthentication(auth);
        }
        return result;
    }

    /**
     * 更改个性签名
     * @param signature
     * @param userId
     * @return
     */
    @PostMapping("/updateSignature")
    @ResponseBody
    public int updateUserSignature(@RequestParam("signature") String signature,@RequestParam("userId") String userId){

        return dataService.updateSignature(signature,userId);
    }
}
