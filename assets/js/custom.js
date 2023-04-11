$(function () {
    //gnb 영역
    fetch("./assets/data/menuData.json")
        .then((response) => response.json())
        .then((json) => {
            data = json.items;

            let html = '';
            let idx = 0;
            data.forEach(element => {

                pointEl = '<span class="dot"></span>';
                isEvent = (element.point) ? pointEl : '';
                isActive = (idx === 0) ? 'active' : '';
                html += `
                    <li class="gnb_item swiper-slide">
                        <a href="#none" class="gnb_link ${isActive}">${element.title}${isEvent}</a>
                    </li>`;

                idx++;
            });

            $('#menuData').html(html);

            //swiper
            const swiper1 = new Swiper("#gnb-swiper", {
                slidesPerView: 'auto',
                spaceBetween: 0,
                autoplay: false,
            });

        });//

    //gnb active 클래스 부여
    $(document).on('click', '.gnb_link', function (e) {
        e.preventDefault();
        $('.gnb_link').removeClass('active')
        $(this).addClass('active');
    });

    $('#main_site').click(function () {
        $('.header .link_list').toggle();
    });//



    //mainbanner 영역
    fetch("./assets/data/mainBannerData.json")
        .then((response) => response.json())
        .then((json) => {
            data = json.items;

            let html = '';

            data.forEach(element => {

                html += `
                    <div class="swiper-slide">
                        <a href="#none">
                            <div class="text_area">
                                <figure><span class="blind">${element.cate}</span></figure>
                                <h2 class="title">${element.title}</h2>
                                <p class="subTxt">${element.desc}</p>
                            </div>
                            <div class="thumb_area">
                                <img src="${element.thumb}" alt="메인 배너 HAPPY 묘 YEAR 이미지">
                            </div>
                        </a>
                    </div>`;

            });

            $('#bannerData1').html(html);

            //swiper
            const swiper2 = new Swiper("#banner_swiper", {
                slidesPerView: 'auto',
                spaceBetween: 5,
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                centeredSlides: true,

                // pagination
                pagination: {
                    el: ".page_area",
                    type: "custom",
                    renderCustom: function (swiper, current, total) {

                        currentNum = (current < 10) ? '0' + current : current;
                        totalNum = (total < 10) ? '0' + total : total;

                        return `<span class="page_current">${currentNum}</span> 
                            <span class="page_total">${totalNum}</span>`;
                    }
                },

            });

        });//



    //mainbanner 전체 보기 영역
    $('#allBanner').click(function () {
        $('.sc_popup01 .popup_bg').show();
        $('.sc_popup01 .popup_inner').addClass('on');

        fetch("./assets/data/mainBannerData.json")
            .then((response) => response.json())
            .then((json) => {
                data = json.items;

                let html = '';

                data.forEach(element => {

                    html += `
                        <li class="cont_item">
                            <a href="#none" class="cont_link">
                                <div class="thumb"><img src="${element.thumb}" alt=""></div>
                                <div class="text">
                                    <figure><span class="blind">${element.cate}</span></figure>
                                    <strong class="title">${element.title}</strong>
                                    <p class="subTxt">${element.desc}</p>
                                </div>
                            </a>
                        </li>`;

                });

                $('#allbannerData').html(html);

            });

    });//

    //공통 팝업 닫기 버튼
    $('.close_btn').click(function () {
        $('.popup_bg').hide();
        $('.popup_inner').removeClass('on');
    });//



    //quickbanner 영역
    fetch("./assets/data/quickBannerData.json")
        .then((response) => response.json())
        .then((json) => {
            data = json.items;

            let html = '';
            data.forEach(element => {

                pointEl = 'hot';

                isEvent = (element.point) ? pointEl : '';
                html += `
                    <div class="swiper-slide">
                        <a href="#none" class="quick_link">
                            <div class="thumb_area ${isEvent}">
                                <img src="${element.thumb}" alt="">
                            </div>
                            <span class="text_area">${element.name}</span>
                        </a>
                    </div>`;

            });

            $('#quickBannerData').html(html);

            //swiper
            const swiper3 = new Swiper("#quickbanner-swiper", {
                slidesPerView: 'auto',
                autoplay: false,
            });

        });//



    //recom 영역
    //recom 피부타입 팝업
    $('#skinType').click(function () {
        $('.sc_popup02 .popup_bg').show();
        $('.sc_popup02 .popup_inner').addClass('on');
    });

    //recom 트러블 팝업
    $('#trouble').click(function () {
        $('.sc_popup03 .popup_bg').show();
        $('.sc_popup03 .popup_inner').addClass('on');
    });
    /**
     * cate1
     * 0 복합성
     * 1 건성
     * 2 극건성
     * 3 지성
     * 4 수분부족지성
     * 5 중성
     */

    /**
     * cate2
     * 0 고민없음
     * 1 민감성
     * 2 트러블
     * 3 탄력없음
     * 4 주름
     * 5 칙칙함
     * 6 건조함
     * 7 모공
     */

    $('#pop_skin li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('#skinType').text($(this).text());
        $('.popup_bg').hide();
        $('.popup_inner').removeClass('on');

        cate1 = $('#pop_skin .active').data('cate1');
        cate2 = $('#pop_skin .active').data('cate2');

        sortData(cate1, cate2);
    });

    $('#pop_trouble li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('#trouble').text($(this).text());
        $('.popup_bg').hide();
        $('.popup_inner').removeClass('on');

        cate1 = $('#pop_trouble .active').data('cate1');
        cate2 = $('#pop_trouble .active').data('cate2');
        sortData(cate1, cate2);
    });

    //첫 페이지에 보여줄 데이터
    function sortFirst(a, b) {
        sortData(a, b)
        $('#pop_skin li').eq(a).addClass('active').siblings().removeClass('active')
        $('#pop_trouble li').eq(b).addClass('active').siblings().removeClass('active')
    }
    sortFirst(0, 2);


    function sortData(cate1, cate2) {
        fetch("./assets/data/prdData.json")
            .then((response) => response.json())
            .then((json) => {
                data = json.items;

                const result = data.filter(function (parm) { return parm.cate1 == cate1 || parm.cate2 == cate2 });

                let html = '';
                result.forEach(element => {

                    saleEl = (element.price.ori === element.price.curr) ? 'hide' : '';

                    html += `
                    <div class="swiper-slide">
                    <div class="product_inner">
                        <a href="#none">
                            <div class="pro_thumb_area">
                                <img src="${element.thumb}" alt="${element.name}">
                            </div>
                            <div class="pro_text_area">
                                <div class="pro_title">
                                    <strong class="brand">${element.brand}</strong>
                                    <span class="name">${element.name}</span>
                                </div>
                                <div class="pro_price">
                                    <span class="delPrice ${saleEl}">${price(element.price.ori)}</span>
                                    <em class="discountRate ${saleEl}">${salepercent(element.price.ori, element.price.curr)}%</em>
                                    <span class="price"><strong class="size_16">${price(element.price.curr)}</strong>원</span>
                                </div>
                                <div class="pro_hashtag">
                                    <span class="hashtag_inner">${element.hashtag}</span>
                                </div>
                            </div>
                        </a>
                        <button class="pro_like"><span class="blind">좋아요</span></button>
                    </div>
                </div>`;

                });
                $('#sortData').html(html);

                //swiper
                const swiper4 = new Swiper("#recom-swiper", {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    autoplay: false,
                });

            });
    }//


    // 천단위 콤마(정규식)
    function price(p) {
        return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    //할인율 함수
    function salepercent(ori, curr) {
        return (ori - curr) / ori * 100;
    }



    //new swiper
    const swiper5 = new Swiper("#new-swiper", {
        slidesPerView: 'auto',
        loop: true,
        spaceBetween: 8,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });


    //advice 영역
    fetch("./assets/data/prdData.json")
        .then((response) => response.json())
        .then((json) => {
            data = json.items;

            let html = '';

            data.forEach(element => {

                benefitHtml = '';
                element.benefit.forEach(benefitEl => {
                    benefitHtml += `<span>${benefitEl}</span>`;
                });

                saleEl = (element.price.ori === element.price.curr) ? 'hide' : '';

                html += `
                    <div class="swiper-slide">
                        <div class="product_inner">
                            <a href="#none">
                                <div class="pro_thumb_area">
                                    <img src="${element.thumb}" alt="${element.name}">
                                </div>
                                <div class="pro_text_area">
                                    <div class="pro_title">
                                        <strong class="brand">${element.brand}</strong>
                                        <span class="name">${element.name}</span>
                                    </div>
                                    <div class="pro_price">
                                        <span class="delPrice ${saleEl}">${price(element.price.ori)}</span>
                                        <em class="discountRate ${saleEl}">${salepercent(element.price.ori, element.price.curr)}%</em>
                                        <span class="price"><strong class="size_16">${price(element.price.curr)}</strong>원</span>
                                    </div>
                                    <div class="pro_rate">
                                        <span class="icon_star">
                                            <span>${element.rate}</span>
                                            <span>${element.review}</span>
                                        </span>
                                    </div>
                                    <div class="pro_gift">${benefitHtml}</div>
                                </div>
                            </a>
                            <button class="pro_like"><span class="blind">좋아요</span></button>
                        </div>
                    </div>`;
            });

            $('#adviceData').html(html);

            //swiper
            const swiper6 = new Swiper("#advice-swiper", {
                slidesPerView: 'auto',
                autoplay: false,
            });

        });//



    //sale 영역
    //탭 메뉴
    var tabBtn = $(".sale_btn > div");
    var tabCont = $(".sale_contents > div");

    tabCont.hide().eq(0).show();

    tabBtn.click(function (e) {
        e.preventDefault();
        var target = $(this);
        var index = target.index();

        tabCont.css("display", "none")
        tabCont.eq(index).css("display", "block")
    });

    $('.sale_btn > div').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        sale1 = $(this).data('sale1');
        saleData(sale1);
    });

    saleData(0);//첫페이지에 보이도록

    function saleData(sale1) {
        fetch("./assets/data/prdData.json")
            .then((response) => response.json())
            .then((json) => {
                data = json.items;

                const result2 = data.filter(function (parm) { return parm.sale1 == sale1 });
                let html = '';
                result2.forEach(element => {

                    html += `
                    <div class="swiper-slide">
                        <div class="product_inner">
                            <a href="#none">
                                <div class="pro_thumb_area"><img src="${element.saleThumb}" alt=""></div>
                                <div class="pro_text_area">
                                    <div class="pro_title">
                                        <strong class="brand">${element.brand}</strong>
                                        <span class="name">${element.name}</span>
                                    </div>
                                    <div class="pro_price">
                                        <em class="discountRate">${salepercent(element.price.ori, element.price.curr)}%</em>
                                        <span class="price"><strong class="size_16">${element.price.curr}</strong>원</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>`;
                });

                $('#saleData1').html(html);
                $('#saleData2').html(html);
                $('#saleData3').html(html);
                $('#saleData4').html(html);
                $('#saleData5').html(html);

                //swiper
                const swiper7 = new Swiper(".sale-swiper", {
                    slidesPerView: 'auto',
                    autoplay: false,
                });

            });
    }//



    //event swiper
    const swiper8 = new Swiper("#event-swiper", {
        slidesPerView: 'auto',
        loop: true,
        spaceBetween: 8,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });


    //best 영역
    //recom 영역에서 사용한 데이터 파일 활용
    $('#pop_period li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.btn_date').text($(this).text());
        $('.popup_bg').hide();
        $('.popup_inner').removeClass('on');

        cate3 = $('#pop_period .active').data('cate3');

        bestData(cate3);
    });

    bestData(0);

    function bestData(cate3) {
        fetch("./assets/data/prdData.json")
            .then((response) => response.json())
            .then((json) => {
                data = json.items;

                const result3 = data.filter(function (parm) { return parm.cate3 == cate3 });

                let html = '';
                result3.forEach(element => {

                    benefitHtml = '';
                    element.benefit.forEach(benefitEl => {
                        benefitHtml += `<span>${benefitEl}</span>`;
                    });

                    saleEl = (element.price.ori === element.price.curr) ? 'hide' : '';

                    html += `
                    <div class="swiper-slide">
                        <div class="product_inner">
                            <a href="#none" class="position">
                                <div class="pro_thumb_area">
                                    <img src="${element.thumb}" alt="${element.name}">
                                </div>
                                <div class="pro_like"><span class="blind">좋아요</span></div>
                            </a>
                            <a href="#none">
                                <div class="pro_text_area">
                                    <div class="pro_title">
                                        <strong class="brand">${element.brand}</strong>
                                        <span class="name">${element.name}</span>
                                    </div>
                                    <div class="pro_price">
                                        <span class="delPrice ${saleEl}">${price(element.price.ori)}</span>
                                        <em class="discountRate ${saleEl}">${salepercent(element.price.ori, element.price.curr)}%</em>
                                        <span class="price"><strong class="size_16">${price(element.price.curr)}</strong>원</span>
                                    </div>
                                    <div class="pro_rate">
                                        <span class="icon_star">
                                            <span>${element.rate}</span>
                                            <span>${element.review}</span>
                                        </span>
                                    </div>
                                    <div class="pro_gift">${benefitHtml}</div>
                                </div>
                            </a>
                        </div>
                    </div>`;
                });

                $('#bestData').html(html);

            });
    }//

    //best 조회기간 팝업
    $('.btn_date').click(function () {
        $('.sc_popup04 .popup_bg').show();
        $('.sc_popup04 .popup_inner').addClass('on');
    });



    //footer swiper
    const swiper9 = new Swiper("#footer-swiper", {
        direction: 'vertical',
        autoplay: true,
        loop: true
    });

});