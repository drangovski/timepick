# TimePick

A lightweight time picker. Numerous 'lightweight' timepickers exist, but many of them are overly complicated for the purpose of a lightweight timepicker and can sometimes lead to frustrating errors when multiple timepickers are placed on a single page. This is another lightweight and customizable timepicker (but less annoying one :)), offering a few themes and the possibility to modify existing ones based on your preferences.

![image](https://github.com/drangovski/timepick/assets/13369413/60e9c44d-3dfb-4beb-9a3f-2514ae9d5f49)


## How to use it?
Download `timepick.js` and `timepick.css` (or download the minified files) files and place them in the appropriate project's directories. After that, include them in your templates:

```html
<link rel="stylesheet" href="project_paths/css/timepick.css">
<script src="project_paths/js/timepick.js"></script>
```

After that, instantiate the timepicker(s) in the following way:
```html
<input type="text" id="time_pick_id" />

<script>
const time_pick_1 = new TimePick('time_pick_id', {
	theme: 'default', // See the available themes below
	hours: 'Hours', // Change the value in your lanugage
	minutes: 'Minutes' // Change the value in your lanugage
});
</script>
```

## Themes
Currently there are a few themes available, but feel free to customize them as you prefer. Also, if you come up with some awesome theme combination, don't hesitate to contribute to this repo. Themes are as it follows:

- default
- green
- red
- blue
- yellow
- dark
- light


