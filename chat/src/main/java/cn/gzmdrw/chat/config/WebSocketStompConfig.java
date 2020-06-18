package cn.gzmdrw.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketStompConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        /*
         * 路径"/websocket"被注册为STOMP端点，对外暴露，客户端通过该路径接入WebSocket服务
         */
        registry.addEndpoint("/webSocket")     //接入点的URl
                .setAllowedOrigins("*")     //跨域
                .withSockJS();              //使用sockJs
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        /*
         * 用户可以订阅来自"/topic"和"/user"的消息，
         * 在Controller中，可通过@SendTo注解指明发送目标，这样服务器就可以将消息发送到订阅相关消息的客户端
         * 在本Demo中，使用topic来达到聊天室效果（单聊+多聊），使用all进行群发效果queue进行单聊效果
         */
        registry.enableSimpleBroker("/on","/topic", "/queue", "/all");

        /*
         * 客户端发送过来的消息，需要以"/app"为前缀，再经过Broker转发给响应的Controller
         */
        registry.setApplicationDestinationPrefixes("/app");
    }
}
