var musics_prefix = "../images/login/musics/",
    images_prefix = "../images/login/images/";


var musics = {
    menu:   musics_prefix + "menu.ogg",
    ingame: musics_prefix + "ingame.mp3"
};
var images = {
    background_menu_mine: images_prefix + "background_menu_mine.png",

    button_normal:      images_prefix + "button_normal.png",
    button_highlighted: images_prefix + "button_highlighted.png",
    button_disabled:    images_prefix + "button_disabled.png",

    editbox: images_prefix + "editbox.png",

    sound:          images_prefix + "sound.png",
    sound_disabled: images_prefix + "sound_disabled.png",
    music:          images_prefix + "music.png",
    music_disabled: images_prefix + "music_disabled.png"
};

var g_resources = [];
for (var i in images) {
    g_resources.push(images[i]);
}
for (var i in musics) {
    g_resources.push(musics[i]);
}
