<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'update' );

/** MySQL database username */
define( 'DB_USER', 'Aqila' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'ZTr}=<=RG+q0^S9%&T$F|~XUT%~|9w}-`xD(k+6R>3:QhiI7>KXRH]_l>&>3faVt' );
define( 'SECURE_AUTH_KEY',  ':tQqbs}-*.LuQSd-`;$zG_6oNHFS0q{UITjM?F2|#]&6=/@Kc(+P:IUH_+;>@gD1' );
define( 'LOGGED_IN_KEY',    'hcw83]H*OikQ5fz<@>,ZZ+W.K)+Kk6KXx*V^m`xR~$J<iy$U$ZhG,scp+~$<tM=1' );
define( 'NONCE_KEY',        'hkaG^Sz<87J*JGBi}KhnBs<K~<2In6!QI<9F:$6cI!SPKl-3znJ:`R&K:%t^a[7t' );
define( 'AUTH_SALT',        '5O@$u dT.A,z&<- YNU/|!:SGSNco$[q.}^wa98$=88C_w!5^(l3bYE/)w^!x{U}' );
define( 'SECURE_AUTH_SALT', '=Ld/6a^S}}UY7Ojm7*YL5kvh&id6^qlj@EXkiz{_} S/|W usk{A8EXPrv~Tyy}-' );
define( 'LOGGED_IN_SALT',   '?%`OU%Pa4GbGV7MV*%V<JXY_$km-5sZ)m^-eY?`>YQ?BdRW=i[.Iox-[,7iR-:G4' );
define( 'NONCE_SALT',       'zEZvD9c,m8d(AX_E8IVYi@GqG$.uX)k1${$l(%t~I)}OH>GVaQW:L:j-^Y5DWwZz' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_atxz';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );

