FROM nginx:alpine

# 删除默认的nginx静态资源
RUN rm -rf /usr/share/nginx/html/*

# 复制dist目录中的文件到nginx服务目录
COPY dist/ /usr/share/nginx/html/

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"] 