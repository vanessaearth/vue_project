<html>
  <head>
    <title>
    users
    </title>
    {# <link rel="stylesheet" href="/public/css/user.css"> #}
  </head>
  <body>
    <ul>
      {% for item in list %}
        <li class="item">
          <a href="{{item.url}}">{{item.name}}</a>
        </li>
      {% endfor%}
    </ul>

  </body>
</html>