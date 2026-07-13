from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

import asyncio
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

from app.core.database import Base
from app.users.models import Users

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


# def run_migrations_online() -> None:
#     connectable = engine_from_config(
#         config.get_section(config.config_ini_section, {}),
#         prefix="sqlalchemy.",
#         poolclass=pool.NullPool,
#     )

#     with connectable.connect() as connection:
#         context.configure(connection=connection, target_metadata=target_metadata)

#         with context.begin_transaction():
#             context.run_migrations()


# if context.is_offline_mode():
#     run_migrations_offline()
# else:
#     run_migrations_online()


def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online():
    # On crée un moteur asynchrone à partir de la config
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    # On utilise connect() de manière asynchrone avec un gestionnaire de contexte
    async with connectable.connect() as connection:
        # run_sync permet de faire le pont entre l'asynchrone et les fonctions synchrones d'Alembic
        await connection.run_sync(do_run_migrations)


# Tout en bas du fichier env.py, remplacez l'appel classique par :
if context.is_offline_mode():
    run_migrations_offline()
else:
    # Lance la boucle d'événement asynchrone pour la migration
    asyncio.run(run_migrations_online())
