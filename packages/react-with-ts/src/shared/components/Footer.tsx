import React, { PureComponent } from 'react'

interface IProps {
}

interface IState {
}

export class Footer extends PureComponent<IProps, IState> {
  render() {
    return (
      <footer id="footer">
				<div className="inner">
					<h3>Get in touch</h3>
					<form action="#" method="post">
						<div className="field half first">
							<label htmlFor="name">Name</label>
							<input name="name" id="name" type="text" placeholder="Name" />
						</div>
						<div className="field half">
							<label htmlFor="email">Email</label>
							<input name="email" id="email" type="email" placeholder="Email" />
						</div>
						<div className="field">
							<label htmlFor="message">Message</label>
							<textarea name="message" id="message" rows={6} placeholder="Message"></textarea>
						</div>
						<ul className="actions">
							<li><input value="Send Message" className="button alt" type="submit" /></li>
						</ul>
					</form>

					<div className="copyright">
						&copy; Untitled. Design: <a href="https://templated.co">TEMPLATED</a>. Images: <a href="https://unsplash.com">Unsplash</a>.
					</div>
				</div>
			</footer>
    )
  }
}
