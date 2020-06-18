package cn.gzmdrw.chat.service;

import cn.gzmdrw.chat.until.HttpUtil;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class RobotService {
    public String sendMessage(String content) {

        // 生成图灵机器人需要的参数格式，简化定义一个id
        Long userid = 123456L;
        String generateContent = generate(content, userid);

        // 访问图灵机器人得到返回结果
        String result = HttpUtil.sendPost(HttpUtil.getTulingUrl(), generateContent);

        // 格式化返回结果为JSON格式数据
        JSONObject object = JSONObject.parseObject(result);

        // 如果是文本，取出values中的text
        String text = object.getJSONArray("results").getJSONObject(0).getJSONObject("values").getString("text");

        return text;
        }

    /**
     * 生成图灵机器人API需要的字符串数据
     *
     * @param content 接收消息的内容
     * @param userid  这里随意编写的用户ID
     * @return 图灵机器人API需要的字符串数据
     */
    private String generate(String content, Long userid) {
        // userInfo
        JSONObject userInfo = new JSONObject();
        userInfo.put("apiKey", "e8a05b6f37fd43f09c316a619a1ccd86");
        userInfo.put("userId", userid);

        // inputText 输入的文本
        JSONObject inputText = new JSONObject();
        inputText.put("text", content);

        // location
        JSONObject location = new JSONObject();
        location.put("city", "贵州");
        location.put("province", "安顺");
        location.put("street", "普定坪上");

        // selfInfo
        JSONObject selfInfo = new JSONObject();
        selfInfo.put("location", location);

        // perception
        JSONObject perception = new JSONObject();
        perception.put("selfInfo", selfInfo);
        perception.put("inputText", inputText);

        JSONObject json = new JSONObject();
        json.put("reqType", 0);
        json.put("perception", perception);
        json.put("userInfo", userInfo);
        return json.toJSONString();
    }
}
