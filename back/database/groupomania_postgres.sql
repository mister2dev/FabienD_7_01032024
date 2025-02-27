--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.likes_id_seq OWNER TO postgres;

--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    content text NOT NULL,
    attachment character varying(255) DEFAULT NULL::character varying,
    video character varying(255) DEFAULT NULL::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    description character varying(255) DEFAULT NULL::character varying,
    attachment character varying(255) DEFAULT NULL::character varying,
    is_active boolean DEFAULT true,
    is_admin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, user_id, post_id, content, created_at, updated_at) FROM stdin;
2	161	46	je teste un commentaire	2024-03-23 22:10:39	2024-03-23 22:10:49
3	166	45	je teste un commentaire	2024-03-23 22:10:39	2024-03-23 22:10:49
5	164	59	je teste encore un commentaire	2024-03-23 22:10:39	2024-03-23 22:10:49
6	165	63	et encore un commentaire	2024-03-23 22:10:39	2024-03-23 22:10:49
7	166	45	allé hop on y va !	2024-03-23 22:10:39	2024-03-23 22:10:49
8	165	59	encore un test	2024-06-10 11:31:06	2024-06-10 11:31:06
10	163	45	ou bien c'est comme une boîte de chocolat ^^	2024-06-10 11:32:39	2024-06-10 11:32:39
13	166	42	Cool ça marche	2024-06-11 11:34:37	2024-06-11 11:34:37
15	163	42	Ca n'a pas l'air de marcher si bien que ça	2024-06-11 14:49:07	2024-06-11 14:49:07
22	166	62	est-ce qu'il saiiiiiit faire une toile ? Biensur que non, c'est un cochon	2024-06-13 14:57:54	2024-06-13 14:57:54
23	166	61	kamoulox	2024-06-13 14:58:24	2024-06-13 14:58:24
24	166	60	Hou pinaise mais y a pas d'sable ???	2024-06-13 14:58:53	2024-06-13 14:58:53
25	167	63	Je s'appelle Groot !	2024-06-13 15:16:06	2024-06-13 15:16:06
26	167	46	Je s'appelle Groot !	2024-06-13 15:17:10	2024-06-13 15:17:10
27	161	76	enchanté	2024-08-23 09:35:43	2024-08-23 09:35:43
33	161	92	N'hésitez pas à partager les vôtres	2024-10-09 21:27:07	2024-10-09 21:27:07
37	161	99	Est-ce que vous aimez son nouveau look futuriste ?	2024-10-24 11:36:18	2024-10-24 11:36:18
39	161	104	et pour travailler en même temps	2024-10-25 09:29:00	2024-10-25 09:29:00
78	161	104	bon ok je vous laisse travailler	2024-11-04 23:35:48	2024-11-04 23:35:48
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (id, user_id, post_id, created_at) FROM stdin;
22	161	76	2024-10-24 01:49:52
23	161	61	2024-10-24 01:51:31
26	163	76	2024-10-24 01:53:02
27	163	60	2024-10-24 01:53:29
32	163	92	2024-10-24 02:21:16
49	161	62	2024-10-24 13:16:46
61	161	92	2025-02-27 16:08:06.564989
70	161	113	2025-02-27 16:55:19.565095
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, user_id, content, attachment, video, created_at, updated_at) FROM stdin;
42	161	C'est le cinquième cette année ...	http://localhost:5000/images/skate_lwz1lt5c.png	\N	2024-03-23 22:03:55	2024-03-23 22:04:04
45	164	"La vie, c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre."	\N	\N	2024-04-25 00:07:37	2024-04-25 00:07:37
46	165	La journée s'annonce bien :)	http://localhost:5000/images/barbecue_lwz1b6yg.png	\N	2024-04-25 00:08:36	2024-04-25 00:08:36
59	166	Un de mes meilleurs rêves à ce jour!	http://localhost:5000/images/reve_d'homer_lx6d83dj.png	\N	2024-06-03 01:12:40	2024-06-03 01:12:40
60	163	Un petit aperçu de mes vacances !	http://localhost:5000/images/vacances_lwyb500c.jpg	\N	2024-06-03 01:43:59	2024-06-03 01:43:59
61	161	Voici mon futur bébé :)	http://localhost:5000/images/ferrari-f90_lwz0e4w6.jpg	\N	2024-06-03 13:30:56	2024-06-03 13:30:56
62	166	Spidercochon Spidercochon, il sait marcher au plafond ^^	http://localhost:5000/images/spidercochon_lwz17s8s.png	\N	2024-06-03 13:45:40	2024-06-03 13:45:40
76	167	Je s'appelle Groot !	\N	\N	2024-06-13 15:13:35	2024-06-13 15:13:35
92	161	L'été me manque déjà, en attendant voici une petite photo souvenir	http://localhost:5000/images/maldives_m22dqf07.jpg	\N	2024-10-09 21:26:14	2024-10-09 21:26:14
113	161	new123123	http://localhost:5000/images/sample_m7ngwuu7.png		2025-02-27 15:56:55.565521	2025-02-27 15:56:55.565521
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, description, attachment, is_active, is_admin, created_at, updated_at) FROM stdin;
163	john	john@bob.fr	$2b$10$aVxuS09AntoTLBR6uwEYq.nB9MQm2LFsYNbvpFSz/kWa2oe5QuJv2	Salut moi c'est John	http://localhost:5000/images/ava2_lwy8tifq.png	t	f	2024-04-28 00:47:12	2024-04-28 00:47:12
164	marise	marise@bob.fr	$2b$10$G3tg01cO0RXPfbe6cA2wJ.2TcF8jjrCEj9Gw.xpflaM0y6xnmIYba	Bonjour je m'appelle Marise	http://localhost:5000/images/ava4_lwy8z7bx.png	t	f	2024-06-03 00:42:45	2024-06-03 00:42:45
165	robert	robert@bob.fr	$2b$10$SY9QjQn8icGXUAGcC5ObHO19oNeJzawAMcuCDJKr3W0crytTTz0ti	Salut moi c'est robert le moustachu	http://localhost:5000/images/ava3_lwy91da2.png	t	f	2024-06-03 00:44:37	2024-06-03 00:44:37
166	homer	homer@bob.fr	$2b$10$unhmkCBWgElvEwX9DojHQeR0UBAnzZ5cHbi.8VT61ZiK/2yPS1sG2	Hou punaise!!!	http://localhost:5000/images/Homer_lwya1v4z.png	t	f	2024-06-03 01:07:03	2024-06-03 01:07:03
167	groot	groot@bob.fr	$2b$10$7tm5u./dnrfYVrt5sObbjeQ8hJ5sCDDyXfMToSVIpcmheyyf.kwD2	Je s'appelle Groot !	http://localhost:5000/images/Groot_lxdefhc6.png	t	f	2024-06-13 15:10:01	2024-06-13 15:10:01
173	pouet	pouet@bob.fr	$2b$10$8VMMmQ07UF1CyF.gLpkxsuJFG2wNEBOI1pc4tcZvS9BqF9tVY2uFK	test123456	http://localhost:5000/images/icon_m1bai1k1.png	f	f	2024-09-17 22:30:12	2024-09-17 22:30:12
161	bob	bob@bob.fr	$2b$10$YjZNQ7Uvp8ni3WmTDFF44OaGKUq0Ufq3oQnHTbr8OTY0h.rJAxrHG	Bonjour, moi c'est Bob	http://localhost:5000/images/Avatar_m3299zg6.png	t	t	2024-04-16 22:46:41	2024-04-16 22:46:41
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 81, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.likes_id_seq', 70, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 114, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 196, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: likes unique_user_post; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT unique_user_post UNIQUE (user_id, post_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: likes fk_post; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: likes fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

