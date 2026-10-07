FROM php:8.3-apache

# Instala extensões necessárias
RUN docker-php-ext-install pdo pdo_mysql

# Ativa o módulo de reescrita do Apache
RUN a2enmod rewrite

# Altera o DocumentRoot do Apache para a pasta /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/conf-available/*.conf

# Copia os arquivos do projeto
COPY . /var/www/html/

# Ajusta permissões do diretório de uploads (com verificação para evitar erros se a pasta não existir)
RUN mkdir -p /var/www/html/uploads && chown -R www-data:www-data /var/www/html/uploads