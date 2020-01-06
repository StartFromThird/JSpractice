create database egg_article;
use egg_article;

create table article(
  id init(10) not null auto_increment,
  img text default null comment '缩略图',
  title varchar(80) default null comment '文章标题',
  summary varchar(300) default null comment '文章摘要', 
  comment text default null comment '文章内容', 
  createTime timestamp default null comment '发布时间',
  primary key(id)
)engine=InnoDB AUto_INCREMENT=1 comment '文章表';

insert into article(img, title, summary, content, createTime)
values('https://img.yzcdn.cn/vant/logo.png', '标题', '介绍基础知识', '快速、系统补充知识。', '2019-10-16 12:12:12')