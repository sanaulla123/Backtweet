window.Backtweet = window.Backtweet || {};

// Model
Backtweet.Tweet = Backbone.Model.extend({});

Backtweet.Timeline = Backbone.Collection.extend({
	model : Backtweet.Tweet,
	url : "http://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=sanaulla&callback=?",
	initialize: function(){
	}
});

//Views
Backtweet.TweetView = Backbone.View.extend({
	tagName : "li",
	render: function(){
		var template = _.template($("#tweetView").html());
		$(this.el).append(template(this.model.toJSON()));
		console.log(this.el);
		return this;
	}
});
Backtweet.TweetListView = Backbone.View.extend({
	el : "#tweetList",
	initialize: function(){
	
		_.bindAll(this);
		this.collection.on("reset",this.addAll,this);
		this.collection.fetch();
	},
	addOne : function(tweet){
		console.log(tweet.toJSON());
		var tweetView = new Backtweet.TweetView({model: tweet});
		var tweetViewHtml = tweetView.render().el;
		console.log(tweetViewHtml);
		$(this.el).append(tweetViewHtml);
		return this;
	},
	addAll : function(){
		$(this.el).html("");
		this.collection.each(this.addOne);
		return this;
	}
	
});