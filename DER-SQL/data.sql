USE `eikon_db`;


/*
ROLE
*/

LOCK TABLES Role WRITE;
INSERT INTO Role (role_id, role, created_at, updated_at) VALUES 
(1,'admin','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(2,'client','2026-03-08 23:57:06','2026-03-08 23:57:06');
UNLOCK TABLES;

/*
CATEGORY
*/

LOCK TABLES Category WRITE;
INSERT INTO Category (category_id, category, created_at, updated_at) VALUES 
(1,'poster','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(2,'photo','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(3,'postcard','2026-03-08 23:57:06','2026-03-08 23:57:06');
UNLOCK TABLES;

/*
SPACE
*/

LOCK TABLES Space WRITE;
INSERT INTO Space (space_id, space, created_at, updated_at) VALUES 
(1,'home','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(2,'office','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(3,'museum','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(4,'professionals','2026-03-08 23:57:06','2026-03-08 23:57:06');
UNLOCK TABLES;

/*
THEME
*/

LOCK TABLES Theme WRITE;
INSERT INTO Theme (theme_id, theme, created_at, updated_at) VALUES 
(1,'animal','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(2,'architecture','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(3,'bauhaus','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(4,'maps','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(5,'blueprints','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(6,'vintage','2026-03-08 23:57:06','2026-03-08 23:57:06');
UNLOCK TABLES;

/*
PRODUCT
*/

LOCK TABLES Product WRITE;
INSERT INTO Product (product_id, title, description, price, cover_image, secundary_image, category_id, created_at, updated_at) VALUES 
(2,'Exhibition Weimar','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/spvyztn0wdcj9lplu01dx2vhj.webp','/images/products/z8t9l547la4rltav01b2gyv61.webp',1,'2026-03-08 23:57:06','2026-03-29 21:08:41'),
(3,'Rino 1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'images/products/animal-2-photo-animal-slide.webp','images/products/animals-rhino-lamina-animal.webp',2,'2026-03-08 23:57:06','2026-03-28 04:19:35'),
(5,'Cranes','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'images/products/animals-crane-2-photo-animal-slide.webp','images/products/animals-crane-2-lamina-animal.webp',2,'2026-03-08 23:57:06','2026-03-28 04:18:47'),
(6,'Cranes 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'images/products/animals-crane-photo-animal-slide.webp','images/products/animals-crane-lamina-animal.webp',2,'2026-03-08 23:57:06','2026-03-28 04:18:53'),
(7,'Peacock 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'images/products/animals-peacock-2-photo-animal-slide.webp','images/products/animals-peacock-2-lamina-animal.webp',2,'2026-03-08 23:57:06','2026-03-28 04:18:59'),
(8,'Whale Shark','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'images/products/animals-whale.shark-photo-animal-slide.webp','images/products/animals-whale-shark-lamina-animal.webp',2,'2026-03-08 23:57:06','2026-03-28 04:19:06'),
(10,'日本','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/xn6dyeara68ygluz2ij0fbtxz.webp','/images/products/rcsfvic5hcqss9r1wznvrcpmx.webp',3,'2026-03-08 23:57:06','2026-03-28 04:02:29'),
(11,'Lose Your Mind','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/g0ra15hur4knvf5f4dpqei3gq.webp','/images/products/acy6lq40fohjcl43cr1rx3noe.webp',3,'2026-03-08 23:57:06','2026-03-28 04:03:27'),
(12,'Roy´ s','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/osxjic6godssope0sxcl5upi3.webp','/images/products/f7u5ef57v7j706ck1idgkno35.webp',3,'2026-03-08 23:57:06','2026-03-28 04:20:47'),
(13,'New-York','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/qrbboavsntavgyo0wdyaonw85.webp','/images/products/zj43fo5im8xk2e0jvk075ztu8.webp',3,'2026-03-08 23:57:06','2026-03-28 04:05:32'),
(16,'Bauhaus 1919','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'images/products/bauhaus-1-afiche-bauhaus-slide.webp','images/products/bauhaus-1-lamina-bauhaus.webp',1,'2026-03-08 23:57:06','2026-03-29 21:05:02'),
(17,'Ausstellung 1923','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'images/products/bauhaus-2-afiche-bauhaus-slide.webp','images/products/bauhaus-2-lamina-bauhaus.webp',1,'2026-03-08 23:57:06','2026-03-29 21:06:02'),
(18,'Barcelona Chair','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'images/products/bauhaus-3-afiche-bauhaus-slide.webp','images/products/bauhaus-3-lamina-bauhaus.webp',1,'2026-03-08 23:57:06','2026-03-29 21:05:30'),
(19,'Weimar 1923','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'images/products/bauhaus-4-afiche-bauhaus-slide.webp','images/products/bauhaus-4-lamina-bauhaus.webp',1,'2026-03-08 23:57:06','2026-03-29 21:06:32'),
(20,'Generic Bicycle','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'images/products/bauhaus-5-afiche-bauhaus-slide.webp','images/products/bauhaus-5-lamina-bauhaus.webp',1,'2026-03-08 23:57:06','2026-03-29 21:07:38'),
(21,'Staatuches','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'images/products/bauhaus-6-afiche-bauhaus-slide.webp','images/products/bauhaus-6-lamina-bauhaus.webp',1,'2026-03-08 23:57:06','2026-03-29 21:08:07'),
(22,'Ray of light','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/ztegba1cgsj7ncbgfw3ee96od.webp','/images/products/sc0htdkjsdspufzxroyrbdiol.webp',2,'2026-03-08 23:57:06','2026-03-29 21:02:23'),
(23,'Blurry Skies','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/bxe5ffu1ctx3jksudecurq5hv.webp','/images/products/geby70v080bqxl1zubhk9vr9e.webp',2,'2026-03-08 23:57:06','2026-03-29 21:02:36'),
(24,'Two cities','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/vmkmrhtoh7uw6qr3iqmqdim26.webp','/images/products/wpt85y5elw04mbd7phbuarmia.webp',2,'2026-03-08 23:57:06','2026-03-29 21:03:21'),
(25,'Alice in the mirror','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/ory9fx51pccx1tvl2vu4ayjh1.webp','/images/products/xs8i9vhlqnlpu47z2bihuuu50.webp',2,'2026-03-08 23:57:06','2026-03-29 21:04:03'),
(26,'Untitled','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/afgjo9hiejqba6d5hitojr7om.webp','/images/products/db7ln8t4ubq434te35bsbfkmn.webp',2,'2026-03-08 23:57:06','2026-03-29 21:03:39'),
(27,'Argentina','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/vkz97d7mx9bdbvdwpgsp9dgn4.webp','/images/products/pxgoz9bgzczb0mc8avui5capo.webp',1,'2026-03-08 23:57:06','2026-03-29 21:09:06'),
(28,'Copernico','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/dfxnhkizm5h1s3jls4dr0ph4d.webp','/images/products/omds2una2tu16p6g3wkqb1mlf.webp',3,'2026-03-08 23:57:06','2026-03-29 21:09:22'),
(29,'In this world','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/clun312orvvyu88e6yrf7klwl.webp','/images/products/rjywubzijatnzlz852njt5ljm.webp',1,'2026-03-08 23:57:06','2026-03-29 21:09:45'),
(33,'Alambic Blueprint','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/b3vszland49l03dhgynqosecd.webp','/images/products/wsjrcob964zzklfuhyynbcknl.webp',1,'2026-03-08 23:57:06','2026-03-28 03:27:38'),
(34,'Camera Blueprint','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/rlf4yjx3j25mylp6p5rww1aey.webp','/images/products/wch6t97ub97146x7v4brp70tm.webp',1,'2026-03-08 23:57:06','2026-03-28 03:27:14'),
(35,'Paperclip Blueprint','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/ml219qx3vgw561c9ic9wb40fw.webp','/images/products/p6thzklhezvuoxyredhla9jej.webp',1,'2026-03-08 23:57:06','2026-03-28 03:29:03'),
(36,'Piano Blueprint','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/ho9prh55mne6ws18hg5ziilw4.webp','/images/products/ljmtkr6d1lzg7268kgbk3wo3e.webp',1,'2026-03-08 23:57:06','2026-03-28 03:29:59'),
(37,'SpaceNeedle Blueprint','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/vbayps4d6bx4lkoc53uvx3ku3.webp','/images/products/lqcaenqzhgzj66puhf16075zw.webp',1,'2026-03-08 23:57:06','2026-03-28 03:30:57'),
(38,'Steam Machine Blueprint','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/fx1tnhj4hb3q8544tl8emftyv.webp','/images/products/devyoe8fj6jd3jzqcjs3nmw2n.webp',1,'2026-03-08 23:57:06','2026-03-28 03:31:55'),
(39,'Tpahccnopththck','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/ynjdemkmjn0800ck4wimekpt3.webp','/images/products/mo5u051x53iybbshpr73qcmk8.webp',1,'2026-03-08 23:57:06','2026-03-29 21:11:58'),
(40,'Vintage Poster 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/dpyp4bxo53el4sx39wgma23di.webp','/images/products/uci66txv2vcowvvfhjqdu30xj.webp',1,'2026-03-08 23:57:06','2026-03-28 03:21:29'),
(41,'La Suze ne s´´ use pas','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/yh6m4kueo458sges23a1y421k.webp','/images/products/cfosl90fmbu78n00v8kdzowzi.webp',1,'2026-03-08 23:57:06','2026-03-29 21:12:49'),
(42,'Vintage Poster 4','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/y9tp2qrp7cvo6ailc5yplngeg.webp','/images/products/zu0vsoc5ttbx47ea7j2y9so5r.webp',1,'2026-03-08 23:57:06','2026-03-28 03:24:13'),
(43,'Japan Week 1967','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/ej5k2larn6eby8mzl574o2g5g.webp','/images/products/cddggfcmlwidfyliik0z8vojq.webp',1,'2026-03-08 23:57:06','2026-03-29 21:13:43'),
(44,'The Hague-on-sea','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',9.00,'/images/products/aczk8rrwtj2pokmyuqqrqbv80.webp','/images/products/yisi1waqz3o96d0c79dzkcu1h.webp',1,'2026-03-08 23:57:06','2026-03-29 21:13:22'),
(69,'At the top','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',865.00,'/images/products/dtrqripl2w8l9cu1uv3xc2fzq.webp','/images/products/cznse2obqkoek89cja7fx3tgv.webp',2,'2026-03-29 19:57:13','2026-03-29 19:57:13'),
(70,'Caracol','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',234.00,'/images/products/iz1yymotlmmpw4i4zp47nx43o.webp','/images/products/ujskkx7ghuf0ttfpryy28vtfc..webp',2,'2026-03-29 20:04:24','2026-03-29 20:04:24'),
(71,'How Long was Now?','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',345.00,'/images/products/voma4nfc31tbaef0xantbuv00.webp','/images/products/yk21pfeytszkrctj5wat2b8lg.webp',2,'2026-03-29 20:48:56','2026-03-29 20:48:56'),
(72,'Tic Tac','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',129.00,'/images/products/itj97itpfspucmaqm4c9cj6nw.webp','/images/products/ftdoj57audsbqn1iycr9kcxqh.webp',1,'2026-03-29 20:49:53','2026-03-29 20:49:53');
UNLOCK TABLES;

/*
PRODUCT_SPACE
*/

LOCK TABLES Product_Space WRITE;
INSERT INTO Product_Space (product_id, space_id) VALUES 
(2,1),
(3,1),
(5,1),
(6,1),
(7,1),
(8,1),
(10,1),
(11,1),
(12,1),
(13,1),
(16,1),
(17,1),
(18,1),
(19,1),
(20,1),
(21,1),
(23,1),
(24,1),
(25,1),
(26,1),
(27,1),
(28,1),
(29,1),
(33,1),
(34,1),
(35,1),
(36,1),
(37,1),
(38,1),
(39,1),
(40,1),
(41,1),
(42,1),
(43,1),
(44,1),
(69,1),
(2,2),
(3,2),
(5,2),
(6,2),
(7,2),
(8,2),
(10,2),
(12,2),
(13,2),
(16,2),
(17,2),
(18,2),
(19,2),
(20,2),
(21,2),
(22,2),
(23,2),
(24,2),
(26,2),
(27,2),
(28,2),
(29,2),
(33,2),
(34,2),
(35,2),
(36,2),
(37,2),
(38,2),
(39,2),
(40,2),
(41,2),
(42,2),
(43,2),
(44,2),
(69,2),
(70,2),
(39,3),
(69,3),
(70,3),
(71,3),
(72,3),
(3,4),
(5,4),
(6,4),
(11,4),
(16,4),
(22,4),
(70,4);
UNLOCK TABLES;

/*
PRODUCT_THEME
*/

LOCK TABLES Product_Theme WRITE;
INSERT INTO Product_Theme (product_id, theme_id) VALUES 
(3,1),
(5,1),
(6,1),
(7,1),
(8,1),
(22,2),
(23,2),
(24,2),
(25,2),
(26,2),
(69,2),
(70,2),
(72,2),
(2,3),
(16,3),
(17,3),
(18,3),
(19,3),
(20,3),
(21,3),
(27,4),
(28,4),
(29,4),
(25,5),
(33,5),
(34,5),
(35,5),
(37,5),
(38,5),
(10,6),
(11,6),
(12,6),
(13,6),
(16,6),
(27,6),
(28,6),
(29,6),
(34,6),
(35,6),
(37,6),
(38,6),
(39,6),
(40,6),
(41,6),
(42,6),
(43,6),
(44,6);
UNLOCK TABLES;





/*
USER
*/

LOCK TABLES User WRITE;
INSERT INTO User (user_id, first_name, last_name, email, password, avatar, role_id, created_at, updated_at) VALUES 
(4,'di','do','a@hgu.com','hjk','/images/users/a3sbrk17lns329ghpxhgzjg5y.jpeg',2,'2026-03-08 23:57:06','2026-03-28 00:17:03'),
(5,'tesing','testing','testing@test.com','qwerty','/images/users/yf6lqn08wwdna5a0xfc1u4b52.png',2,'2026-03-08 23:57:06','2026-03-08 23:57:06'),
(6,'Alicia','Wonderland','alice3@alice.com','$2b$10$7wNr8t.yi7oK3Q1uvdn6Fu2JGOnJqFelIOdhZco0M8VsDkzCKEkBq','/images/users/hemf5dpeghmd1oau1typi10yq.png',2,'2026-03-08 23:57:06','2026-03-08 23:57:06'),
(7,'Alicia267','alice_in_chains','alice2@alice.com','$2b$10$yBJ/uS6Bbzkq4OmbLamPauz8/KPlyorSx3aptKM.6e8rXxU3J5MVG','/images/users/tyawdw6iwia5x26aqii7h9l6i.png',2,'2026-03-08 23:57:06','2026-03-28 00:24:28'),
(10,'jo','to','jo@jo.com','$2b$10$LXU6M188ZD.BmjKiZOaZQuo3QLNnyzepTkX9vI86FzIPilGd3eKjS','/images/users/v5tgz7scvahj7bxce67gmvs6f.png',1,'2026-03-08 23:57:06','2026-03-08 23:57:06'),
(11,'client','to','to@to.com','$2b$10$F3fCrJom1z4CYhmXRtDgc.f9..IagDZI9jnnG06GyNtZr0It.FMyq','/images/users/g9i5bwhjggde5n8ah86g8gvaf.png',2,'2026-03-08 23:57:06','2026-03-08 23:57:06'),
(12,'mathieu','ambrois','ambrois.mathieu@gmail.com','$2b$10$J1Ccyy9Z9ulLhoMuy1rFB.3nSWZEZPfSymcdVQFDWTW4Xui2I5lzW','/images/users/k816p35drpxroq6r35xgob802.png',1,'2026-03-27 21:29:53','2026-03-27 21:29:53'),
(19,'Guest','Guest','guest@guest.com','$2b$10$w1ikqa6glcKEuLjlKPzb4eeM0lb4dE5mag8Geae6V4aNky4R.dn9W','/images/users/jnsb4fcfmrs9alg76nuu6ejuq.webp',2,'2026-04-25 18:26:56','2026-04-25 18:26:56'),
(20,'Admin','Admin','admin@admin.com','$2b$10$KoqDrPDus0rTFlWRibIWPOZxg8dtWoL..J3BA6uzfS9CRpqyxyEHe','/images/users/wz8rha59xge8s2opci3a25msj.png',1,'2026-04-25 18:32:15','2026-04-25 15:36:20');
UNLOCK TABLES;


/*
CART
*/


LOCK TABLES Cart WRITE;
INSERT INTO Cart (cart_id, user_id, date_creation, created_at, updated_at) VALUES 
(1,4,'2026-03-08 23:57:06','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(2,5,'2026-03-08 23:57:06','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(3,6,'2026-03-08 23:57:06','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(4,6,'2026-03-08 23:57:06','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(5,7,'2026-03-08 23:57:06','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(6,7,'2026-03-08 23:57:06','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(9,11,'2026-03-08 23:57:06','2026-03-08 23:57:06','2026-03-08 23:57:06'),
(10,11,'2026-03-08 23:57:06','2026-03-08 23:57:06','2026-03-08 23:57:06');
UNLOCK TABLES;

/*
CART DETAIL
*/

LOCK TABLES Cart_Detail WRITE;
INSERT INTO Cart_Detail (cart_id, product_id, quantity, date_added) VALUES 
(1,25,1,'2026-03-08 23:57:06'),
(1,36,1,'2026-03-08 23:57:06'),
(1,37,1,'2026-03-08 23:57:06'),
(2,7,1,'2026-03-08 23:57:06'),
(2,24,1,'2026-03-08 23:57:06'),
(3,26,1,'2026-03-08 23:57:06'),
(4,28,1,'2026-03-08 23:57:06'),
(4,29,1,'2026-03-08 23:57:06'),
(5,5,1,'2026-03-08 23:57:06'),
(6,12,1,'2026-03-08 23:57:06'),
(6,40,1,'2026-03-08 23:57:06'),
(9,11,1,'2026-03-08 23:57:06'),
(9,41,1,'2026-03-08 23:57:06');
UNLOCK TABLES;
