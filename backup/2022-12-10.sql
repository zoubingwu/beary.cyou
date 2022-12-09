DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments(
  id          TEXT NOT NULL PRIMARY KEY,
  createdAt   TEXT NOT NULL,
  content     TEXT NOT NULL,
  by_nickname TEXT NOT NULL
);

INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('989c9329-e989-46a7-87ab-dee178aa417a','2021-06-26T12:37:40.106Z','first!','zou');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('a781741f-ca81-4994-bd37-44426a183ecd','2021-06-27T13:17:23.866Z','很赞！','ld');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('6f5bc76c-8f8d-44cf-9e51-d2470385f570','2021-06-27T13:27:55.631Z','很棒👍🏻','Cokile');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('ff329ab9-c565-4da3-9225-ee0fcc3725f8','2021-06-27T13:30:04.825Z','相爱吧终有一散','西');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('8bf702f0-d147-4d55-9cae-de0667dbb094','2021-06-27T13:30:16.464Z','🐂🍺','啊哈哈');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('01369fa9-5afd-435d-be18-3352a47c175a','2021-06-28T02:09:09.450Z','广告位招租','RoCry');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('95e4b93c-9b47-440d-95e2-e4c095bb7d67','2021-06-28T08:09:39.050Z','聚是一团火，散是满天星。
bearychat yyds','圈圈');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('101eea25-aefd-4d74-8d40-86223ab72bb8','2021-06-29T08:20:48.012Z','今日 06.29，没什么特别的，怀念一人次。','欧海洋');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('743126a6-b2c8-4fed-bdc7-b548d875622a','2021-07-28T15:32:27.829Z','今日 07.28，也没什么特别的，怀二人次。','风油精');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('b1c4a5c0-7180-4555-8f7b-c5e9e162711f','2021-10-23T06:31:33.241Z','今日 10.23，也没什么特别的，怀念三人次。','小飞象');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('90bfa9d0-fc06-443c-b177-d3d68560b415','2021-12-08T05:53:08.343Z','😮‍💨','风油精');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('6a8e0f01-ddd7-4c68-9440-2a2af4fb2ee8','2022-01-04T14:47:24.524Z','应该只有我会偶尔来这里看看了😮‍💨','风油精');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('39e31ce4-157c-4706-9ce5-136971f1a531','2022-05-11T06:54:07.929Z','😮‍💨','风油精');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('8254bdd3-b255-4377-9e73-5536c54a8eb1','2022-05-18T05:54:12.784Z','😮‍💨','shonenada');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('d5c2ed4d-01ee-4a95-896a-220a65b7cc96','2022-05-18T05:54:30.403Z','😮‍💨','shonenada');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('fb4a1bd6-29d9-4cb3-8ed6-87d25add860b','2022-05-18T05:55:23.147Z','🐻','ccc');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('f4e4a58c-309c-4263-b28f-7acf4f4d0fdc','2022-05-18T05:59:16.643Z','真棒','txm');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('189c3ca7-1735-460e-b844-6ca70aacfde6','2022-05-18T06:01:30.089Z','留在心里❤','yl');
INSERT INTO Comments(id,createdAt,content,by_nickname) VALUES ('d11493fd-00f5-4932-9d2e-3906873e6bee','2022-08-11T07:46:14.251Z','Au revoir. Adieu.','tonyseek');
