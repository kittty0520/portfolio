/*메뉴를 필터링 */

let foodArr = [
    {
        이름:'짜장면',
        매움:'N',
        종류:'한식',
    },
    {
        이름:'탕수육',
        매움:'Y',
        종류:'양식',
    }
]

function FilterName(name,arr){
    return arr.filter((value)=>value.종류===name);
}

const result =FilterName('양식',foodArr);

console.log(result);


/*질문을 바꾸는 함수*/

const questionList={
    '첫번째 질문입니다.',
    '두번째 질문입니다.',
    '세번째 질문입니다.',
}

const 
