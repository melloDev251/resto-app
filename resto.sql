PGDMP                         y            resto     12.8 (Ubuntu 12.8-1.pgdg20.04+1)     13.4 (Ubuntu 13.4-1.pgdg20.04+1)     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16385    resto    DATABASE     Z   CREATE DATABASE resto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'fr_FR.UTF-8';
    DROP DATABASE resto;
                postgres    false            ?            1259    16393    restaurants    TABLE       CREATE TABLE public.restaurants (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    location character varying(50) NOT NULL,
    price_range integer NOT NULL,
    CONSTRAINT restaurants_price_range_check CHECK (((price_range >= 1) AND (price_range <= 5)))
);
    DROP TABLE public.restaurants;
       public         heap    postgres    false            ?            1259    16391    restaurants_id_seq    SEQUENCE     {   CREATE SEQUENCE public.restaurants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.restaurants_id_seq;
       public          postgres    false    203            ?           0    0    restaurants_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;
          public          postgres    false    202            ?            1259    16402    reviews    TABLE       CREATE TABLE public.reviews (
    id bigint NOT NULL,
    restaurant_id bigint,
    name character varying(50) NOT NULL,
    review text NOT NULL,
    rating integer NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            ?            1259    16400    reviews_id_seq    SEQUENCE     w   CREATE SEQUENCE public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.reviews_id_seq;
       public          postgres    false    205            ?           0    0    reviews_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;
          public          postgres    false    204                       2604    16396    restaurants id    DEFAULT     p   ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);
 =   ALTER TABLE public.restaurants ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            !           2604    16405 
   reviews id    DEFAULT     h   ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);
 9   ALTER TABLE public.reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            ?          0    16393    restaurants 
   TABLE DATA           F   COPY public.restaurants (id, name, location, price_range) FROM stdin;
    public          postgres    false    203   ?       ?          0    16402    reviews 
   TABLE DATA           J   COPY public.reviews (id, restaurant_id, name, review, rating) FROM stdin;
    public          postgres    false    205   U       ?           0    0    restaurants_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.restaurants_id_seq', 13, true);
          public          postgres    false    202            ?           0    0    reviews_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.reviews_id_seq', 16, true);
          public          postgres    false    204            $           2606    16399    restaurants restaurants_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.restaurants DROP CONSTRAINT restaurants_pkey;
       public            postgres    false    203            &           2606    16411    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    205            '           2606    16412 "   reviews reviews_restaurant_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id);
 L   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_restaurant_id_fkey;
       public          postgres    false    2852    205    203            ?   ?   x?%?K?0?ϧ?	*??z?na??(Ip??v?4?g:r]?y﬜????Gb??y?VO?4@?R?#???1:za?Ȼ??5???P%?f?l??????b
?g??*??Y?"??:j??U)vK??ާ?B??οR?9?~??vBR      ?     x?m?=O?0????p'6?????B?0?\?Kcŵ#?	???K?V??`??s??{g|FtP?????C@!	l??{?0)?/㰹?2???A??h&rHaG?z???5n??J??ϻQX?=???? ɷ?¯?t?Ԇ??j??????I?i?S?5?3۲??g(-?قT???6???m????@?*]??%???KC/4?k/??p9O?P ?Z?\U
	|????????w???1x:?Cm?µ???T?e??K?@?Z??X?^j???8?M?k?b?on????????     