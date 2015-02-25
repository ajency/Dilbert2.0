Directory structure for Dilbert mobile app

Dilbert_mobile
<ul>
<li>hooks</li>
<li>plugins</li>
<li>scss</li>
<li>www</li> 
	<ul>
		<li>app - Contains all compiled js files from the sources directory</li>
		<li>img - Contains all images for the app</li>
		<li>lib</li>
			<ul>
				<li>ionic - contains default ionic libraries</li>
				<li>libs - contains 3rd party libraries</li>
			</ul>
		<li>sources - contains coffeescript files</li>
			<ul>
				<li>common - files used commonly throughtout the app</li>
				<li>app.coffee</li>
				<li>login</li>
					<ul>
						<li>login.tmp.html - template to render the login page</li>
						<li>login.coffee - Contains controllers,directives etc for the login module</li>
					</ul>
				<li>Other module specific code and template files go here in their respective folders (As seen with the login directory)</li>
			</ul>
		<li>index.html</li>
	</ul>
</ul>