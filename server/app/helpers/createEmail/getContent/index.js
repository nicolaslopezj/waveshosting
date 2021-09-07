import styles from './styles'

export default content => `<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title></title>
${styles}
</head>
<body>
${content}
</body>
</html>`
