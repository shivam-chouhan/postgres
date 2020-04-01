# postgres
this is the assignment with the postgres db and express api
database queries

CREATE TABLE public.user_info
(
    id integer NOT NULL DEFAULT nextval('user_info_id_seq'::regclass),
    first_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    middle_name character varying(20) COLLATE pg_catalog."default",
    last_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(15) COLLATE pg_catalog."default" NOT NULL,
    role integer NOT NULL,
    address character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT user_info_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.user_info
    OWNER to postgres;

-- Trigger: valid_trigger

-- DROP TRIGGER valid_trigger ON public.user_info;

CREATE TRIGGER valid_trigger
    BEFORE INSERT OR UPDATE 
    ON public.user_info
    FOR EACH ROW
    EXECUTE PROCEDURE public.validate();
    
    
    
    
    
    
    trigger function=>
    CREATE FUNCTION public.validate()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$BEGIN
IF(NEW.first_name !~'^[A-z]{1,20}$')
THEN RAISE EXCEPTION 'INVALID first name';
END IF;
IF(NEW.last_name !~ '^[A-z]{1,20}$')
THEN RAISE EXCEPTION 'INVALID last name';
END IF;
IF(NEW.email !~'^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')
THEN RAISE EXCEPTION 'INVALID Email';
END IF;
IF(NEW.phone !~ '^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$')
THEN RAISE EXCEPTION 'INVALID Phone Number';
END IF;
RETURN NEW;
END;$BODY$;

ALTER FUNCTION public.validate()
    OWNER TO postgres;
