import {Citation} from "../models/citation";
import {User} from "../models/user";
import {TestUsersDB} from "../user/TestUsersDB";
import {UserService} from "../services/user.service";
/**
 * Created by baunov on 14/10/16.
 */
 export class TestCitationsDB
{
  private citArray:Array<Citation>;

  constructor()
  {
    this.citArray = [];
    let testUser1 = new User("ViktorSemis", "parugvai1234", "semis@vik.com", "Виктор Семисынов");
    let testUser2 = new User("Sugrow", "parugvai1234", "parezguru@gmail.com", "Даниил Баунов");
    UserService.db.addUser(testUser1);
    UserService.db.addUser(testUser2);
    this.citArray.push(new Citation(
      "Никуда не ходи, но и на месте не стой", "Толстой Л.Н.", testUser1, ["мотивация", "гений", "парадокс"])
    );
    this.citArray.push(new Citation("Тем у кого нет настоящего, приходится говорить о прошлом.", "Паустовский", testUser1, ["недовольство", "стеб"]));
    this.citArray.push(new Citation("Слепец тот - кто не видит.", "Паустовский", testUser1, ["очевидное", "стеб"]));
    this.citArray.push(new Citation("Ты ищешь меня в толпе глазами но не находишь. Потому что искать надо руками. Иди на ощупь.", "Паустовский", testUser1, ["стеб", "гений"]));
    this.citArray.push(new Citation("когда голодна - съешь даже склизнявую сордельку", "Гулюгина Д.", testUser2, ["диета", "женское", "брошенки"]));
    this.citArray.push(new Citation("Ты — грустная сосисочка, брошенная в кастрюлю переживаний.", "Гулюгина Д.", testUser2, ["диета", "женское", "брошенки", "афоризм"]));
    this.citArray.push(new Citation("испортить пиццу могут только униженные судьбой оливки", "Гулюгина Д.", testUser2, ["диета", "женское", "брошенки", "стеб"]));
    this.citArray.push(new Citation("Отличный повар вронского, привезенный из торжествующей партии новых обедали. Испытывал приятное чувство торжества за столом, празднуя выбор неведовского, он не даст. Весело провел время и поняла, что весело. Выборах за телеграмму такого милого тона в этот день у себя.", "Гулюгина Д.", testUser2, ["рандом", "классика", "веселье"]));
    this.citArray.push(new Citation("Никогда не ставь себя выше меня. Никогда. Если вдруг так вышло, что ты стоишь на ступеньке выше - ты должен немедленно присесть.",
      "Гоголь", testUser2, ["гений", "недовольство", "свэг"]));
  }

  public getUserCitations(user:User):Array<Citation>
  {
    return this.citArray.filter(citation => citation.publisher._id == user._id);
  }

  public getById(id:String):Citation
  {
    for(let i=0; i < this.citArray.length; i++)
    {
      if(this.citArray[i]._id == id)
      {
        return this.citArray[i];
      }
    }

    return new Citation("No such citation");
  }

  public getRndCitation():Citation
  {
    var rnd = Math.floor(Math.random()*this.citArray.length);
    return this.citArray[rnd];
  }

  public addCitation(citation:Citation):Citation
  {
    this.citArray.push(citation);
    return citation;
  }

  public likeCitation(id:String):Citation
  {
    let cit:Citation = this.getById(id);
    cit.likes ++;
    cit.rank ++;
    //cit.rank = this.calculateRank(cit.likes, cit.dislikes);
    return cit;
  }

  public dislikeCitation(id:String):Citation
  {
    let cit:Citation = this.getById(id);
    cit.dislikes ++;
    cit.rank --;
    //cit.rank = this.calculateRank(cit.likes, cit.dislikes);
    return cit;
  }

  private calculateRank(likes:number, dislikes:number):number
  {
    return likes == 0?0:likes/(likes + dislikes);
  }

  public viewCitation(id:String):Citation
  {
    let cit:Citation = this.getById(id);
    cit.views++;
    return cit;
  }

  public getList(num:number):Array<Citation>
  {
    return this.citArray.slice(0,num);
  }

}
