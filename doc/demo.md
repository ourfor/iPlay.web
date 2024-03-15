### 制作演示站点

clone仓库代码，安装[deno](https://deno.com), 

```bash
curl -fsSL https://deno.land/install.sh | sh
```

然后复制`.env.example`为`.env`

修改`.env`里面的***TMDB_TOKEN***为TMDB提供的读凭证

![API入口](image/20240315_180719.png)

![拷贝读访问令牌](image/20240315_180801.png)

然后运行:
```bash
deno run --allow-all tools/top-tv.ts
deno run --allow-all tools/top-movie.ts
```

会在`build`目录下面生成视频资源，没有视频播放资源

### 安装Emby

安装正常步骤安装Emby即可，然后将`build`目录生成的资源添加到
Emby的媒体目录中，等待Emby下载媒体数据即可

在`Emby`里面中新建一个`guest`用户并设置密码

### Cloudflare代理

为了实现游客登录，用cloudflare代理对Emby接口的请求:
```ts

```