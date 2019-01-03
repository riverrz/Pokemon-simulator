import React, { Component, Fragment } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.userHP = 100;
    this.opHP = 100;
    this.opAttacks = [
      this.flameThrower,
      this.dragonClaw,
      this.ember,
      this.growl
    ];
    this.playerMove = 0;
  }
  /* users moves */
  waterCannon = () => {
    if (this.playerMove === 0 && this.userHP !== 0) {
      var miss = Math.floor(Math.random() * 10 + 1); // miss rate
      if (miss === 1) {
        document.getElementById("message").innerHTML =
          " Blastoise's attack missed! ";
      } else {
        document.getElementById("message").innerHTML =
          " Blastoise used water cannon "; // attack
        var critical = Math.floor(Math.random() * 10 + 1); // critical
        if (critical === 4) {
          for (var x = 0; x < 2; x++) {
            this.opHP = this.opHP - 30; // yes critical
          }
        } else {
          this.opHP = this.opHP - 30; // no critical
        }
        if (this.opHP < 0) {
          this.opHP = 0;
        } //faint
        document.getElementById("apHP").innerHTML = this.opHP; // update hp
        if (this.opHP === 0) {
          document.getElementById("message").innerHTML = " Charizard fainted! "; // update message
        }
      }
      //wait();
      this.playerMove = 1; // update player move
    }
  };

  waterPulse = () => {
    if (this.playerMove === 0 && this.userHP !== 0) {
      var miss = Math.floor(Math.random() * 10 + 1);
      if (miss === 1) {
        document.getElementById("message").innerHTML =
          " Blastoise's attack missed! ";
      } else {
        document.getElementById("message").innerHTML =
          " Blastoise used water pulse ";
        var critical = Math.floor(Math.random() * 10 + 1);
        if (critical === 4) {
          for (var x = 0; x < 2; x++) {
            this.opHP = this.opHP - 20;
          }
        } else {
          this.opHP = this.opHP - 20;
        }
        if (this.opHP < 0) {
          this.opHP = 0;
        }
        document.getElementById("apHP").innerHTML = this.opHP;
        //document.getElementById('message').innerHTML = " Charizard2 "
        if (this.opHP === 0) {
          document.getElementById("message").innerHTML = " Charizard fainted! ";
        }
      }
      //wait();
      this.playerMove = 1;
    }
  };

  surf = () => {
    if (this.playerMove === 0 && this.userHP !== 0) {
      //alert("Water Cannon!");
      var miss = Math.floor(Math.random() * 10 + 1);
      if (miss === 1) {
        document.getElementById("message").innerHTML =
          " Blastoise's attack missed! ";
      } else {
        document.getElementById("message").innerHTML = " Blastoise used surf ";
        var critical = Math.floor(Math.random() * 10 + 1);
        if (critical === 4) {
          for (var x = 0; x < 2; x++) {
            this.opHP = this.opHP - 10;
          }
        } else {
          this.opHP = this.opHP - 10;
        }
        if (this.opHP < 0) {
          this.opHP = 0;
        }
        document.getElementById("apHP").innerHTML = this.opHP;
        if (this.opHP === 0) {
          document.getElementById("message").innerHTML = " Charizard fainted! ";
        }
      }
      //wait();
      this.playerMove = 1;
    }
  };
  tackle = () => {
    if (this.playerMove === 0 && this.userHP !== 0) {
      //alert("Water Cannon!");
      var miss = Math.floor(Math.random() * 10 + 1);
      if (miss === 1) {
        document.getElementById("message").innerHTML =
          " Blastoise's attack missed! ";
      } else {
        document.getElementById("message").innerHTML =
          " Blastoise used tackle ";
        var critical = Math.floor(Math.random() * 10 + 1);
        if (critical === 4) {
          for (var x = 0; x < 2; x++) {
            this.opHP = this.opHP - 5;
          }
        } else {
          this.opHP = this.opHP - 5;
        }
        if (this.opHP < 0) {
          this.opHP = 0;
        }
        document.getElementById("apHP").innerHTML = this.opHP;
        //document.getElementById('message').innerHTML = " Charizard4 "
        if (this.opHP === 0) {
          document.getElementById("message").innerHTML = " Charizard fainted! ";
        }
      }
      //wait();
      this.playerMove = 1;
    }
  };

  /* opponent's moves */

  flameThrower = () => {
    var miss = Math.floor(Math.random() * 10 + 1); // miss rate
    if (miss === 1) {
      document.getElementById("message").innerHTML =
        " Charizard's attack missed! "; // attack missed
    } else {
      document.getElementById("message").innerHTML =
        " Charizard used flame thrower "; // attack
      var critical = Math.floor(Math.random() * 10 + 1); // critical
      if (critical === 4) {
        for (var x = 0; x < 2; x++) {
          // yes critical
          this.userHP = this.userHP - 30;
        }
      } else {
        this.userHP = this.userHP - 30; // no critical
      }
      if (this.userHP < 0) {
        this.userHP = 0;
      } // faint
      document.getElementById("myHP").innerHTML = this.userHP; // update hp
      if (this.userHP === 0) {
        // fainted
        document.getElementById("message").innerHTML = " Blastoise fainted! "; // fainted
      }
    }
  };

  dragonClaw = () => {
    var miss = Math.floor(Math.random() * 10 + 1);
    if (miss === 1) {
      document.getElementById("message").innerHTML =
        " Charizard's attack missed! ";
    } else {
      document.getElementById("message").innerHTML =
        " Charizard used dragon claw ";
      var critical = Math.floor(Math.random() * 10 + 1);
      if (critical === 4) {
        for (var x = 0; x < 2; x++) {
          this.userHP = this.userHP - 20;
        }
      } else {
        this.userHP = this.userHP - 20;
      }
      if (this.userHP < 0) {
        this.userHP = 0;
      }
      document.getElementById("myHP").innerHTML = this.userHP;
      if (this.userHP === 0) {
        document.getElementById("message").innerHTML = " Blastoise fainted! ";
      }
    }
  };

  ember = () => {
    var miss = Math.floor(Math.random() * 10 + 1);
    if (miss === 1) {
      document.getElementById("message").innerHTML =
        " Charizard's attack missed! ";
    } else {
      document.getElementById("message").innerHTML = " Charizard used ember ";
      var critical = Math.floor(Math.random() * 10 + 1);
      if (critical === 4) {
        for (var x = 0; x < 2; x++) {
          this.userHP = this.userHP - 10;
        }
      } else {
        this.userHP = this.userHP - 10;
      }
      if (this.userHP < 0) {
        this.userHP = 0;
      }
      document.getElementById("myHP").innerHTML = this.userHP;
      if (this.userHP === 0) {
        document.getElementById("message").innerHTML = " Blastoise fainted! ";
      }
    }
  };

  growl = () => {
    var miss = Math.floor(Math.random() * 10 + 1);
    if (miss === 1) {
      document.getElementById("message").innerHTML =
        " Charizard's attack missed! ";
    } else {
      document.getElementById("message").innerHTML = " Charizard used growl ";
      var critical = Math.floor(Math.random() * 10 + 1);
      if (critical === 4) {
        for (var x = 0; x < 2; x++) {
          this.userHP = this.userHP - 5;
        }
      } else {
        this.userHP = this.userHP - 5;
      }
      if (this.userHP < 0) {
        this.userHP = 0;
      }
      document.getElementById("myHP").innerHTML = this.userHP;
      if (this.userHP === 0) {
        document.getElementById("message").innerHTML = " Blastoise fainted! ";
      }
    }
  };

  compPokemon = () => {
    // continue
    if (this.playerMove === 1 && this.opHP !== 0) {
      // whos move
      var move = Math.floor(Math.random() * 4); // choose move randomly
      this.opAttacks[move](); // call attack from array
      this.playerMove = 0; // update player move
    }
  };

  render() {
    return (
      <Fragment>
        <div className="game">
          <div className="opponent">
            <div className="stats">
              <div className="top">
                <div className="pokeballs">
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                </div>
                <div id="apHP" className="hp-count">
                  100
                </div>
              </div>
              <span className="name">Charizard</span>
              <span className="level">86</span>
            </div>
            <img
              className="pokemon"
              src="http://play.pokemonshowdown.com/sprites/xyani/charizard-megax.gif"
              alt="Pokemon"
            />
          </div>
          <div className="player">
            <div className="stats">
              <div className="top">
                <div className="pokeballs">
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                  <div className="pokeball" />
                </div>
                <div id="myHP" className="hp-count">
                  100
                </div>
              </div>
              <span className="name">Blastoise</span>
              <span className="level">86</span>
            </div>
            <img
              className="pokemon"
              src="http://play.pokemonshowdown.com/sprites/xyani/blastoise-mega.gif"
              alt="Pokemon"
            />
          </div>
        </div>
        <div className="box">
          <div id="message" className="message">
            What should Blastoise do?
          </div>
          <div className="actions">
            <button onClick={this.waterCannon}>Water Cannon</button>
            <button onClick={this.waterPulse}>Water Pulse</button>
            <button onClick={this.surf}>Surf</button>
            <button onClick={this.tackle}>Tackle</button>
          </div>
          <div className="continue">
            <button onClick={this.compPokemon}>Continue</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
