package cn.gzmdrw.chat.security;

import cn.gzmdrw.chat.pojo.SysUser;
import cn.gzmdrw.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails user = null;
        SysUser sysUser = null;
        try {
            sysUser = userService.getUserByName(username);
            user = User.withUsername(sysUser.getUsername()).password(sysUser.getPassword())
                    .authorities(getAuthorities()).build();
        } catch (Exception e) {
            throw new UsernameNotFoundException("用户不存在");
        }
        return user;
    }

    public Collection<GrantedAuthority> getAuthorities() {
        List<GrantedAuthority>
                authList = new ArrayList<GrantedAuthority>(2);

        // 所有的用户默认拥有ROLE_USER权限,可以通过查询数据库拿到用户的权限
        authList.add(new SimpleGrantedAuthority("ROLE_USER"));

        return authList;
    }

}
