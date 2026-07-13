import bcrypt


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(password=plain.encode("utf-8"), salt=bcrypt.gensalt()).decode(
        "utf-8"
    )


def check_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(password=plain, hashed_password=hashed)
