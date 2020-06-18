package cn.gzmdrw.chat.pojo;

import java.io.Serializable;
import java.util.List;

public class SysUser implements Serializable {

    private Integer id;     //用户id

    private String userId;      //用户账号

    private String username;    //用户名称

    private String password;       //密码

    private String headShot;        //头像

    private String sex;         //性别

    private String signature;   //个性签名

    private List<SysFriend> sysFriends;

    public String getHeadShot() {
        return headShot;
    }

    public void setHeadShot(String headShot) {
        this.headShot = headShot;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<SysFriend> getSysFriends() {
        return sysFriends;
    }

    public void setSysFriends(List<SysFriend> sysFriends) {
        this.sysFriends = sysFriends;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}
