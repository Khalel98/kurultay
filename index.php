<?php

require_once __DIR__ . '/vendor/autoload.php';
$settings = require_once __DIR__ . '/settings.php';
require_once __DIR__ . '/functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);

    if (!empty($name) && !empty($email) && !empty($phone)) {
        $body = "<h1>Данные от пользователя</h1>\n
            <p><strong>Имя:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Номер телефона:</strong> $phone</p>";

        $attachments = []; // Можно добавить файлы для отправки

        // Email получателя всегда задан статически
        $recipient_email = 'asiqazaqstan@gmail.com';

        // Отправляем письмо на заданный email
        $success = send_mail($settings['mail_settings_prod'], [$recipient_email], 'Данные с формы', $body, $attachments);

        if ($success) {
            // Возвращаем успешный статус (обработка в fetch)
            echo "Письмо успешно отправлено.";
        } else {
            // Возвращаем сообщение об ошибке
            echo "Ошибка отправки письма.";
        }
    } else {
        echo "Заполните все поля.";
    }
}
