mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player2) {
    if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
        myDart = sprites.create(img`
            5 5 5 
            `, SpriteKind.Projectile)
        myDart.setFlag(SpriteFlag.DestroyOnWall, true)
        myDart.setPosition(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y)
        myDart.setVelocity(100, 0)
    } else {
        mySprite2 = sprites.create(img`
            5 5 5 
            `, SpriteKind.Projectile)
        mySprite2.setFlag(SpriteFlag.DestroyOnWall, true)
        mySprite2.setPosition(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).y)
        mySprite2.setVelocity(-100, 0)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)) && otherSprite == myDart) {
        mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.life, -1)
        sprites.destroy(otherSprite, effects.trail, 200)
    }
    if (sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)) && otherSprite == mySprite2) {
        mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.life, -1)
        sprites.destroy(otherSprite, effects.trail, 200)
    }
})
mp.onLifeZero(function (player2) {
    music.stopAllSounds()
    music.play(music.stringPlayable("C5 B A G F E D C ", 40), music.PlaybackMode.LoopingInBackground)
    music.play(music.stringPlayable("C D E F G A B C5 ", 40), music.PlaybackMode.LoopingInBackground)
    if (player2 == mp.playerSelector(mp.PlayerNumber.Two)) {
        mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.One))
    } else {
        mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.Two))
    }
})
let mySprite2: Sprite = null
let myDart: Sprite = null
music.play(music.stringPlayable("C D C D E D E D ", 500), music.PlaybackMode.LoopingInBackground)
music.play(music.stringPlayable("A E - F - D - C5 ", 250), music.PlaybackMode.LoopingInBackground)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(img`
    . c c c b . . . . . . . 
    c c c c b b . . . c c . 
    c c c c b b b b b c c b 
    c c c c b b f f f c c f 
    f c c c b f . . . f f . 
    . f f f f . . . . . . . 
    `, SpriteKind.Player))
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(img`
    . . . . . . . 9 8 8 8 . 
    . 8 8 . . . 9 9 8 8 8 8 
    9 8 8 9 9 9 9 9 8 8 8 8 
    f 8 8 f f f 9 9 8 8 8 8 
    . f f . . . f 9 8 8 8 f 
    . . . . . . . f f f f . 
    `, SpriteKind.Player))
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setPosition(20, 160 / 2.5)
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setPosition(140, 160 / 2.5)
forever(function () {
    tiles.setCurrentTilemap(tilemap`level1`)
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One))
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two))
})
