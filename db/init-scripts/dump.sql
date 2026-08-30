--
-- PostgreSQL database dump
--

\restrict nHLRtvHebUhTNfpV7dyo11e7thyzTfDp9omdEKYhc3R511LYzKAMsbRJ0aT3dmk

-- Dumped from database version 16.14
-- Dumped by pg_dump version 16.15 (Debian 16.15-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Festivals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Festivals" (
    "Id" uuid NOT NULL,
    "Slug" text NOT NULL,
    "Name" text NOT NULL,
    "StartDate" date NOT NULL,
    "EndDate" date NOT NULL,
    "Location" text NOT NULL
);


--
-- Name: Performances; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Performances" (
    "Id" uuid NOT NULL,
    "FestivalId" uuid NOT NULL,
    "PerformerName" text NOT NULL,
    "StageName" text NOT NULL,
    "StartTime" timestamp with time zone NOT NULL,
    "EndTime" timestamp with time zone
);


--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


--
-- Data for Name: Festivals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Festivals" ("Id", "Slug", "Name", "StartDate", "EndDate", "Location") FROM stdin;
292f43d8-0d84-441f-a1f0-a22a3d518aaf	dabb-lounge	Dabb Lounge	2026-06-20	2026-06-22	Atelier Brucker, Stuttgart
\.


--
-- Data for Name: Performances; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Performances" ("Id", "FestivalId", "PerformerName", "StageName", "StartTime", "EndTime") FROM stdin;
0584764e-94f1-4ab9-b6f7-f0aee5e5c0fa	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Durante	The Canyon	2026-06-20 14:00:00+00	2026-06-20 16:00:00+00
0e0c33bc-39ad-4df0-acf4-5b7ecbf9110e	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Valeska	The Monolith (Main)	2026-06-20 14:00:00+00	2026-06-20 16:00:00+00
1f9f21a4-7c25-4d46-ae0f-fc5eedef64ae	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Parra for Cuva	The Resonance Dome	2026-06-20 19:00:00+00	2026-06-20 20:30:00+00
2722df5a-898f-4334-98a6-2067d343f94c	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Elkka	The Canyon	2026-06-20 16:30:00+00	2026-06-20 18:30:00+00
39d8316c-2417-4181-98d3-a0a2cd41183b	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Late Night Jam	The Monolith (Main)	2026-06-20 23:30:00+00	\N
3b8723c0-df2a-4de6-a1c5-2287337d82d4	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Monolink (DJ)	The Resonance Dome	2026-06-20 23:30:00+00	\N
4843c785-4d03-44f6-ac41-182b1b9e001d	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Justice	The Monolith (Main)	2026-06-20 19:00:00+00	2026-06-20 20:30:00+00
732eda9f-8f39-415d-b986-2d3dce82c289	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Four Tet	The Resonance Dome	2026-06-20 21:00:00+00	2026-06-20 23:00:00+00
76b0e205-e449-473a-903a-afe612d7a6fc	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Tsha	The Resonance Dome	2026-06-20 16:30:00+00	2026-06-20 18:30:00+00
7d8d306d-28f7-4f27-9eb4-c9fd8719c97f	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Rüfüs Du Sol	The Monolith (Main)	2026-06-20 21:00:00+00	2026-06-20 23:00:00+00
a360a387-4e0a-4794-9aae-ad447d5afb44	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Joplyn	The Resonance Dome	2026-06-20 14:00:00+00	2026-06-20 16:00:00+00
af193072-22c8-458c-b82b-e1fd66ddec68	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Bicep (Chroma)	The Canyon	2026-06-20 19:00:00+00	2026-06-20 20:30:00+00
c46ad263-02dc-4f27-a13c-9aa36f04928e	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Jamie xx	The Canyon	2026-06-20 21:00:00+00	2026-06-20 23:00:00+00
d599b38b-57b1-4041-b765-e43a3c5d0054	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Skin on Skin	The Canyon	2026-06-20 23:30:00+00	\N
d8c36bed-d7d3-4c77-b578-f7d52216513e	292f43d8-0d84-441f-a1f0-a22a3d518aaf	Peggy Gou	The Monolith (Main)	2026-06-20 16:30:00+00	2026-06-20 18:30:00+00
\.


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20260817021406_InitialCreate	10.0.11
\.


--
-- Name: Festivals PK_Festivals; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Festivals"
    ADD CONSTRAINT "PK_Festivals" PRIMARY KEY ("Id");


--
-- Name: Performances PK_Performances; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Performances"
    ADD CONSTRAINT "PK_Performances" PRIMARY KEY ("Id");


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: IX_Festivals_Slug; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "IX_Festivals_Slug" ON public."Festivals" USING btree ("Slug");


--
-- Name: IX_Performances_FestivalId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Performances_FestivalId" ON public."Performances" USING btree ("FestivalId");


--
-- Name: IX_Performances_StageName; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IX_Performances_StageName" ON public."Performances" USING btree ("StageName");


--
-- Name: Performances FK_Performances_Festivals_FestivalId; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Performances"
    ADD CONSTRAINT "FK_Performances_Festivals_FestivalId" FOREIGN KEY ("FestivalId") REFERENCES public."Festivals"("Id") ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict nHLRtvHebUhTNfpV7dyo11e7thyzTfDp9omdEKYhc3R511LYzKAMsbRJ0aT3dmk

