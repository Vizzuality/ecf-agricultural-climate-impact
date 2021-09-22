#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""Tests for `ecf_agricultural_climate_impact` package."""

import pytest

from ecf_agricultural_climate_impact import ecf_agricultural_climate_impact # noqa


@pytest.fixture
def response():
    """Sample pytest fixture.
    See more at: http://doc.pytest.org/en/latest/fixture.html
    """
    # import requests
    # return requests.get('https://github.com/audreyr/cookiecutter-pypackage')


def test_content(response):
    """Sample pytest test function with the pytest fixture as an argument."""
    # from bs4 import BeautifulSoup
    # assert 'GitHub' in BeautifulSoup(response.content).title.string

