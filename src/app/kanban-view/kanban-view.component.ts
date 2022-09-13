import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.css'],
})
export class KanbanViewComponent implements OnInit {
  stages = [
    {
      id: 1,
      name: 'Backlog',
      cards: [],
    },
    {
      id: 2,
      name: 'To Do',
      cards: [],
    },
    {
      id: 3,
      name: 'Ongoing',
      cards: [],
    },
    {
      id: 4,
      name: 'Done',
      cards: [],
    },
  ];
  newCardName = '';
  selectedCardName = '';
  selectedStageIndex = -1;
  selectedCardId;
  disableBackward: boolean;
  disableForward: boolean;
  disableDelete: boolean;
  constructor() {}

  ngOnInit() {
    this.disableBackward = true;
    this.disableForward = true;
    this.disableDelete = true;
  }

  onAddCard() {
    this.stages[0].cards.push({
      id: this.stages[0].cards.length + 1,
      name: this.newCardName,
    });
    this.newCardName = '';
    this.disableBackward = true;
    this.disableForward = true;
    this.disableDelete = true;
    this.selectedCardName = '';
  }

  onCardselect(data) {
    this.selectedStageIndex = data.stageId - 1;
    this.selectedCardId = data.cardId - 1;
    if (this.selectedStageIndex > 0) {
      this.disableBackward = false;
    }
    if (this.selectedStageIndex < 3) {
      this.disableForward = false;
    }
    this.disableDelete = false;
    this.selectedCardName =
      this.stages[this.selectedStageIndex].cards[this.selectedCardId].name;
  }

  onMoveBackCard() {
    this.disableBackward = false;
    if (this.selectedStageIndex - 1 == 0) {
      this.disableBackward = true;
    }
    if (this.selectedStageIndex == 3) {
      this.disableForward = false;
    }

    this.remove()
    let len = this.stages[this.selectedStageIndex - 1].cards.length;
    this.stages[this.selectedStageIndex - 1].cards.push({
      id: len + 1,
      name: this.selectedCardName,
    });
    this.selectedStageIndex = this.selectedStageIndex - 1;
    this.selectedCardId = len;
  }

  onMoveForwardCard() {
    this.disableForward = false;
    if (this.selectedStageIndex + 1 == 3) {
      this.disableForward = true;
    }
    if (this.selectedStageIndex == 0) {
      this.disableBackward = false;
    }
    this.remove()
    let len = this.stages[this.selectedStageIndex + 1].cards.length;
    this.stages[this.selectedStageIndex + 1].cards.push({
      id: len + 1,
      name: this.selectedCardName,
    });
    this.selectedStageIndex = this.selectedStageIndex + 1;
    this.selectedCardId = len;
  }
  onDelete() {
    this.remove();
    this.disableBackward = true;
    this.disableForward = true;
    this.disableDelete = true;
    this.selectedCardName = '';
  }
  remove(){
    this.stages[this.selectedStageIndex].cards.splice(this.selectedCardId, 1);
    for(let i=this.selectedCardId; i<this.stages[this.selectedStageIndex].cards.length;i++){
      this.stages[this.selectedStageIndex].cards[i].id = i+1;
    }
  }
}
