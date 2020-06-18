package cn.gzmdrw.chat.pojo;

import java.io.Serializable;

public class SendMessage implements Serializable {

    public SendMessage( ) {
    }

    private Integer messageType;      //发送状态：群 2：单发1

    private String toUser;

    private SysUser sysUser;      //发送de用户

   /* private String  headShot;
*/
    private String receiver;      //接受e用户

    private String message;     //发送的消息

    private String sendDate;        //时间

    public Integer getMessageType() {
        return messageType;
    }

    public String getToUser() {
        return toUser;
    }

    public void setToUser(String toUser) {
        this.toUser = toUser;
    }

    public void setMessageType(Integer messageType) {
        this.messageType = messageType;
    }

    public SysUser getSysUser() {
        return sysUser;
    }

    public void setSysUser(SysUser sysUser) {
        this.sysUser = sysUser;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSendDate() {
        return sendDate;
    }

    public void setSendDate(String sendDate) {
        this.sendDate = sendDate;
    }
}