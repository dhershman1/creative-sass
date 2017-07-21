const Koa = require('koa');
const KoaRouter = require('koa-router');
const mount = require('koa-mount');
const serve = require('koa-static');
const views = require('koa-hbs-renderer');
const app = new Koa();
const router = new KoaRouter();

app.use(mount('/dist', serve(`${__dirname}/dist`)));
app.use(views({
	defaultLayout: 'main',
	contentTag: 'content',
	paths: {
		layouts: `${__dirname}/html/layout`,
		views: `${__dirname}/html`,
		helpers: `${__dirname}/html/helpers`
	},
	extension: 'html'
}));

router
	.redirect('/', '/home')
	.get('/:page', async (ctx) => {
		await ctx.render(ctx.params.page, {
			pageName: ctx.params.page
		});
	});

app
	.use(router.routes())
	.use(router.allowedMethods())
	.listen(5000);

console.log('Listening on port 5000');
