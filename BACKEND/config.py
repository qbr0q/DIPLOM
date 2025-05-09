from authx import AuthX, AuthXConfig

config = AuthXConfig()
config.JWT_CSRF_METHODS = [] # отключаю проверку csrf токена
config.JWT_SECRET_KEY = 's0m3Th!ngS3cur3@128BitKey' # по сути секретные ключи надо хранить в .env, но мне пох
config.JWT_ACCESS_COOKIE_NAME = 'access_token'
config.JWT_TOKEN_LOCATION = ['cookies']

security = AuthX(config=config)

HOST = 'localhost'
PORT = 8080

FRONT_HOST = 'localhost'
FRONT_PORT = '3000'
