import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiSelectComponent } from './multi-select.component';
import { By } from '@angular/platform-browser';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('MultiSelectComponent', () => {
    let component: MultiSelectComponent;
    let fixture: ComponentFixture<MultiSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MultiSelectComponent, FontAwesomeTestingModule],
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(MultiSelectComponent);

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create multi select component', () => {
        expect(component).toBeTruthy();
    });

    it('should create button', () => {
        const button = fixture.debugElement.query(By.css('button'));
        expect(button).toBeTruthy();
    });

    it('should create menu', () => {
        const menu = fixture.debugElement.query(By.css('.menu'));
        expect(menu).toBeTruthy();
    });

    it('menu has no class show before click', () => {
        expect(fixture.debugElement.query(By.css('.show'))).toBeFalsy();
    });

    it('menu has class show after click', () => {
        const button = fixture.debugElement.query(
            By.css('button')
        ).nativeElement;
        button.click();
        fixture.detectChanges();
        const menu = fixture.debugElement.query(By.css('.menu')).nativeElement;
        expect(menu).toHaveClass('show');
    });

    it('show filter if withFilter is true', () => {
        const withFilter = component.withFilter;
        const input = fixture.debugElement.query(By.css('input'));
        if (withFilter) {
            expect(input).toBeTruthy();
        } else {
            expect(input).toBeFalsy();
        }
    });

    // New test case for a different input value to items
    it('should display correct items when provided', () => {
        const newItems = ['Option 1', 'Option 2', 'Option 3'];
        fixture.componentRef.setInput('items', newItems);
        fixture.detectChanges();

        const menu = fixture.debugElement.query(By.css('.menu'));
        expect(menu).toBeTruthy();
        // console.warn(menu.nativeElement)
        const [selectedList, unselectedList] = menu.queryAll(By.css('ul'))
        expect(selectedList).toBeTruthy();
        expect(unselectedList).toBeTruthy();
        const selectedItems = selectedList.queryAll(By.css('li'));
        const unselectedItems = unselectedList.queryAll(By.css('li'));
        expect(selectedItems.length).toEqual(0);
        expect(unselectedItems.length).toEqual(3);

        unselectedItems.forEach((item, index) => {
            expect(item.nativeElement.textContent.trim()).toEqual(newItems[index]);
        })
    });

    // New test case for a different input value to items
    it('should display correct sorted items when provided', () => {
        const newItems = ['Option 2', 'Option 3', 'Option 1'];
        fixture.componentRef.setInput('items', newItems);
        fixture.detectChanges();

        const menu = fixture.debugElement.query(By.css('.menu'));
        expect(menu).toBeTruthy();
        // console.warn(menu.nativeElement)
        const [selectedList, unselectedList] = menu.queryAll(By.css('ul'))
        expect(selectedList).toBeTruthy();
        expect(unselectedList).toBeTruthy();
        const selectedItems = selectedList.queryAll(By.css('li'));
        const unselectedItems = unselectedList.queryAll(By.css('li'));
        expect(selectedItems.length).toEqual(0);
        expect(unselectedItems.length).toEqual(3);

        unselectedItems.forEach((item, index) => {
            expect(item.nativeElement.textContent.trim()).toEqual(`Option ${index + 1}`);
        })
    });

  // New test case for a different input value to items
  it('should apply preselected items', () => {
    const newItems = ['Option 2', 'Option 3', 'Option 4', 'Option 1'];
    const newInitiallySelected = ['Option 2', 'Option 4'];
    fixture.componentRef.setInput('items', newItems);
    fixture.componentRef.setInput('initiallySelected', newInitiallySelected);
    fixture.detectChanges();

    const menu = fixture.debugElement.query(By.css('.menu'));
    expect(menu).toBeTruthy();
    // console.warn(menu.nativeElement)
    const [selectedList, unselectedList] = menu.queryAll(By.css('ul'))
    expect(selectedList).toBeTruthy();
    expect(unselectedList).toBeTruthy();
    const selectedItems = selectedList.queryAll(By.css('li'));
    const unselectedItems = unselectedList.queryAll(By.css('li'));
    expect(selectedItems.length).toEqual(2);
    expect(unselectedItems.length).toEqual(2);

    unselectedItems.forEach((item, index) => {
      expect(item.nativeElement.textContent.trim()).toEqual(`Option ${2 * index + 1}`);
    })
    selectedItems.forEach((item, index) => {
      expect(item.nativeElement.textContent.trim()).toEqual(`Option ${2 * index + 2}`);
    })
  });
});
